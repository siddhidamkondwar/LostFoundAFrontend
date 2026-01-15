import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllLostItems,
  getLostItemsByUsername,
} from "../../Services/LostItemService";
import { getRole } from "../../Services/LoginService";
import "./LostItemReport.css";
import claimifyLogo from "./clamify-logo.png"; // logo added

import {
  FaFacebookF,
  FaLinkedinIn,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa";

const LostItemReport = () => {
  const navigate = useNavigate();
  const [lostItems, setLostItems] = useState([]);
  const [role, setRole] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const showLostItems = () => {
    getRole().then((response) => {
      const userRole = response.data;
      setRole(userRole);

      if (userRole === "Admin") {
        getAllLostItems().then((res1) => {
          setLostItems(res1.data);
        });
      } else if (userRole === "Student") {
        getLostItemsByUsername().then((res2) => {
          setLostItems(res2.data);
        });
      }
    });
  };

  useEffect(() => {
    showLostItems();
  }, []);

  const returnBack = () => {
    if (role === "Admin") navigate("/AdminMenu");
    else if (role === "Student") navigate("/StudentMenu");
  }; // [web:48][conversation_history:12]

  const filteredItems = lostItems.filter((item) =>
    item.lostItemName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fi-page">
      {/* Navbar with logo on the left and Back on the right */}
      <header className="fi-navbar">
        <div className="fi-nav-left">
          <img
            src={claimifyLogo}
            alt="Claimify Lost and Found logo"
            className="fi-logo-img"
          />
        </div>

        <div className="fi-nav-right">
          <button className="fi-back-btn" onClick={returnBack}>
            Back
          </button>
        </div>
      </header>

      <main className="fi-main">
        <div className="fi-content">
          {/* Header */}
          <h1 className="fi-title">Lost Items</h1>

          {/* Search bar */}
          <div className="fi-search-wrapper">
            <div className="fi-search-bar">
              <span className="fi-search-icon">⌕</span>
              <input
                type="text"
                placeholder="Item Name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Cards grid */}
          <div className="fi-cards-row">
            {filteredItems.length === 0 && (
              <div className="fi-no-items">No items found</div>
            )}

            {filteredItems.map((item) => {
              const imgUrl = item.imagePath
                ? `http://localhost:8080${item.imagePath}`
                : null;

              console.log("Lost item:", item.lostItemId, item.imagePath, imgUrl);

              return (
                <div className="fi-card" key={item.lostItemId}>
                  <div className="fi-card-header">
                    <div className="fi-card-meta">
                      <span className="fi-card-label">Item Id:</span>
                      <span className="fi-card-value">{item.lostItemId}</span>
                    </div>
                    <div className="fi-card-meta">
                      <span className="fi-card-label">User Id:</span>
                      <span className="fi-card-value">{item.username}</span>
                    </div>
                  </div>

                  <div className="fi-card-thumb">
                    {item.imagePath && (
                      <img
                        src={imgUrl}
                        alt={item.lostItemName}
                        className="lost-card-image"
                        onError={(e) => {
                          console.error(
                            "Image failed to load:",
                            imgUrl,
                            "for item:",
                            item.lostItemId
                          );
                          e.target.style.display = "none";
                        }}
                      />
                    )}
                  </div>

                  <div className="fi-card-body">
                    <div className="fi-item-name">{item.lostItemName}</div>
                    <div className="fi-item-text">
                      Location: {item.location}
                      <br />
                      Category: {item.category} | Color: {item.color} | Brand:{" "}
                      {item.brand}
                      <br />
                      Lost Date: {item.lostDate}
                      <br />
                      Status: {item.status ? "Found" : "Not Found"}
                    </div>
                  </div>

                  <div className="fi-card-footer">
                    <button
                      className="fi-view-btn"
                      onClick={() =>
                        navigate(`/MatchItemSearch/${item.lostItemId}`)
                      }
                    >
                      Find Match
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="footer-main_1">
        <div className="footer-divider_1" />

        <div className="footer-brand-row_1">
          <div className="footer-brand-text_1">
            Claimify – Campus Lost &amp; Found
          </div>

          <div className="footer-links-columns_1">
            <div className="footer-col_1">
              <div className="footer-col-title_1">Product</div>
              <div className="footer-link_1">Features</div>
              <div className="footer-link_1">How it works?</div>
              <div className="footer-link_1">Pricing</div>
            </div>

            <div className="footer-col_1">
              <div className="footer-col-title_1">Support</div>
              <div className="footer-link_1">Help &amp; FAQ</div>
              <div className="footer-link_1">Contact</div>
              <div className="footer-link_1">Report a problem</div>
            </div>

            <div className="footer-col_1">
              <div className="footer-col-title_1">Campus</div>
              <div className="footer-link_1">About this project</div>
              <div className="footer-link_1">Team</div>
              <div className="footer-link_1">Privacy &amp; Terms</div>
            </div>
          </div>
        </div>

        <div className="footer-social_1">
          <div className="social-square_1">
            <FaFacebookF />
          </div>
          <div className="social-square_1">
            <FaLinkedinIn />
          </div>
          <div className="social-square_1">
            <FaYoutube />
          </div>
          <div className="social-square_1">
            <FaInstagram />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LostItemReport;
