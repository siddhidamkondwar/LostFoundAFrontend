import React, { useState, useEffect, useRef } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { getUserDetails } from "../../Services/LoginService";
import "./ChatMessage.css";
import { useNavigate } from "react-router-dom";
import EmojiPicker from "emoji-picker-react";

let stompClient = null;
let typingTimeoutId = null;

const CONVERSATION_ID = "general";

const ChatMessage = () => {
  const navigate = useNavigate();

  const [connected, setConnected] = useState(false);
  const [username, setUsername] = useState("");
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("chatMessages");
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [typingUser, setTypingUser] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const messagesEndRef = useRef(null);

  // persist messages
  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  // auto-scroll
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, typingUser]);

  // fetch user and connect once
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await getUserDetails();
        const user =
          response.data?.username || response.data?.name || response.data;
        if (user) {
          setUsername(user);
          connect(user);
        } else {
          console.error("Username not found in API response");
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();

    return () => {
      if (stompClient) {
        stompClient.deactivate();
        stompClient = null;
      }
      if (typingTimeoutId) {
        clearTimeout(typingTimeoutId);
      }
    };
  }, []);

  const connect = (autoName) => {
    if (!autoName?.trim()) return;
    if (stompClient && stompClient.active) return;

    const socket = new SockJS("http://localhost:9595/lostfound/ws");

    stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,

      onConnect: () => {
        setConnected(true);

        // register user
        stompClient.publish({
          destination: "/app/register",
          body: JSON.stringify({ sender: autoName }),
        });

        // messages for this conversation
        stompClient.subscribe(
          `/topic/conversations.${CONVERSATION_ID}`,
          (payload) => {
            const msg = JSON.parse(payload.body);
            setMessages((prev) => [...prev, msg]);
          }
        );

        // typing events
        stompClient.subscribe(
          `/topic/conversations.${CONVERSATION_ID}.typing`,
          (payload) => {
            const typingEvent = JSON.parse(payload.body);
            if (typingEvent.sender === autoName) return;

            setTypingUser(typingEvent.sender);

            if (typingTimeoutId) {
              clearTimeout(typingTimeoutId);
            }
            typingTimeoutId = setTimeout(() => {
              setTypingUser(null);
            }, 2000);
          }
        );

        // online users
        stompClient.subscribe("/topic/users", (payload) => {
          const list = JSON.parse(payload.body);
          setUsers(list);
        });
      },

      onStompError: (frame) => {
        console.error("Broker error:", frame.headers["message"]);
      },
    });

    stompClient.activate();
  };

  const sendTyping = () => {
    if (!stompClient || !stompClient.connected) return;

    const typingMsg = {
      sender: username,
      type: "TYPING",
      content: "typing",
    };

    stompClient.publish({
      destination: `/app/conversations/${CONVERSATION_ID}/typing`,
      body: JSON.stringify(typingMsg),
    });
  };

  const sendMessage = () => {
    if (!stompClient || !stompClient.connected) return;
    if (!input.trim()) return;

    const msg = {
      sender: username,
      content: input,
      type: "TEXT",
    };

    stompClient.publish({
      destination: `/app/conversations/${CONVERSATION_ID}/send`,
      body: JSON.stringify(msg),
    });

    setInput("");
    setTypingUser(null);
    setShowEmojiPicker(false);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);

    if (!stompClient || !stompClient.connected) return;

    sendTyping();

    if (typingTimeoutId) {
      clearTimeout(typingTimeoutId);
    }
    typingTimeoutId = setTimeout(() => {
      setTypingUser(null);
    }, 1500);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleEmojiClick = (emojiData) => {
    setInput((prev) => prev + emojiData.emoji);
  };

  const formatTime = (ts) => {
    if (!ts) return "";
    const d = new Date(ts);
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <h3>Loading user details...</h3>
      </div>
    );
  }

  const returnBack = () => {
    navigate("/StudentMenu");
  };

  return (
    <div className="chat-page-bg">
      <div className="chat-container">
        {!connected ? (
          <div className="login-screen">
            <div className="login-card">
              <h2>Connecting to Chat...</h2>
            </div>
          </div>
        ) : (
          <div className="chat-room">
            {/* Sidebar */}
            <div className="sidebar">
              <h3>👥 Online Users</h3>
              <ul>
                {users.map((user, i) => (
                  <li key={i} className="user-item">
                    🟢 {user}
                  </li>
                ))}
                {users.length === 0 && <li>No users online</li>}
              </ul>
            </div>

            {/* Chat section */}
            <div className="chat-content">
              <div className="chat-header">
                <h3>💬 General Chat</h3>
                <div className="chat-header-right">
                  <span className="username-label">{username}</span>
                  <button className="return-btn" onClick={returnBack}>
                    Return
                  </button>
                </div>
              </div>

              <div className="messages" id="messageBox">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`message ${
                      msg.sender === username ? "self" : "other"
                    }`}
                  >
                    <div className="message-text">
                      <b>{msg.sender}:</b> {msg.content}
                    </div>
                    <div className="msg-time">{formatTime(msg.timestamp)}</div>
                  </div>
                ))}

                {typingUser && (
                  <div className="typing-indicator">
                    {typingUser} is typing...
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              <div className="input-area">
                <div className="emoji-wrapper">
                  <button
                    type="button"
                    className="emoji-toggle-btn"
                    onClick={() => setShowEmojiPicker((prev) => !prev)}
                  >
                    😀
                  </button>

                  {showEmojiPicker && (
                    <div className="emoji-popup">
                      <EmojiPicker onEmojiClick={handleEmojiClick} />
                    </div>
                  )}
                </div>

                <input
                  type="text"
                  placeholder="Type a message..."
                  value={input}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                />
                <button className="send-btn" onClick={sendMessage}>
                  Send
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
