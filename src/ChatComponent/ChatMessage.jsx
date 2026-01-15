import React, {useState,useEffect } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import {getUserDetails} from "../../Services/LoginService";
import "./ChatMessage.css";
import { useNavigate } from 'react-router-dom';

let stompClient = null;

const ChatMessage = () => {

    let navigate = useNavigate();
    const [connected, setConnected] = useState(false);
    const [username, setUsername] = useState("");
    const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("chatMessages");
    return saved ? JSON.parse(saved) : [];
  });

  const [input, setInput] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true)
 
  // Save messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);
 
  // Fetch user details once
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await getUserDetails();
        const user = response.data?.username || response.data?.name || response.data;
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
        console.log("🔌 Disconnecting WebSocket...");
        stompClient.deactivate();
        stompClient = null;
      }
    };
  }, []);
 
   //Connect only once and prevent duplicates
  const connect = (autoName = username) => {
    if (!autoName.trim()) return;
 
    // Prevent reconnect if already active
    if (stompClient && stompClient.active) {
      console.log("Already connected — skipping reconnect.");
      return;
    }
 
    const socket = new SockJS("http://localhost:9595/lostfound/ws");
 
    stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
 
      onConnect: () => {
       
        console.log("✅ Connected to WebSocket");
        setConnected(true);
 
        // Register user
        stompClient.publish({
          destination: "/app/register",
          body: JSON.stringify({ sender: autoName }),
        });
 
     // Subscribe to messages (only once)
        stompClient.subscribe("/topic/messages", (payload) => {
          const msg = JSON.parse(payload.body);
          setMessages((prev) => [...prev, msg]);
        });
 
        // Subscribe to online users list
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
 
  // Send message safely
  const sendMessage = () => {
    if (!stompClient || !stompClient.connected) {
      console.warn("Not connected to server");
      return;
    }
 
    if (!input.trim()) return;
 
    const msg = { sender: username, content: input };
 
    stompClient.publish({
      destination: "/app/sendMessage",
      body: JSON.stringify(msg),
    });
 
    setInput("");
  };
 
  if (loading) {
    return (
      <div className="loading-screen">
        <h3>Loading user details...</h3>
      </div>
    );
  }
 
  const returnBack=()=>{
       navigate('/StudentMenu');
}
 
 
  return (
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
             
              <span className="username">{username}</span>
              <button style={{marginLeft: "10px"}} onClick={()=>returnBack()} className="btn btn-warning">Return</button>  
            </div>
 
            <div className="messages" id="messageBox">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`message ${
                    msg.sender === username ? "self" : "other"
                  }`}
                >
                  <b>{msg.sender}:</b> {msg.content}
                </div>
              ))}
            </div>
 
            <div className="input-area">
              <input
                type="text"
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <button onClick={sendMessage}>Send</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

}

export default ChatMessage;