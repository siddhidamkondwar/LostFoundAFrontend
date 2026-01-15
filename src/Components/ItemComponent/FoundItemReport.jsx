import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllFoundItems,
  getFoundItemsByUsername,
} from "../../Services/FoundItemService";
import { getRole } from "../../Services/LoginService";
import "../../Components/ItemComponent/FoundItemReport.css";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa";

const FoundItemsReport = () => {
  const navigate = useNavigate();
  const [itemList, setItemList] = useState([]);
  const [role, setRole] = useState("");
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");

    getRole()
      .then((response) => {
        const raw = response.data;
        console.log("role raw =", raw);

        // normalize role value
        const r = String(raw || "")
          .toLowerCase()
          .replace("role_", ""); // e.g. ROLE_STUDENT -> student

        setRole(r);

        if (r === "admin") {
          return getAllFoundItems();
        } else if (r === "student") {
          return getFoundItemsByUsername();
        } else {
          throw new Error("Unknown role: " + raw);
        }
      })
      .then((res) => {
        if (!res) return;
        console.log("found items from API =", res.data);
        setItemList(res.data || []);
      })
      .catch((err) => {
        if (err.response) {
          console.error("Axios error status:", err.response.status);
          console.error("Axios error data:", err.response.data);
        } else {
          console.error("Axios error:", err.message || err);
        }
        setError("Failed to load found items.");
        setItemList([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleBack = () => {
    if (role === "admin") navigate("/AdminMenu");
    else if (role === "student") navigate("/StudentMenu");
    else navigate("/");
  };

  // search by name, location, category, brand, color
  const filteredItems = itemList.filter((item) => {
    const q = searchText.trim().toLowerCase();
    if (!q) return true;

    const fields = [
      item.foundItemName,
      item.location,
      item.category,
      item.brand,
      item.color,
    ];

    return fields.some((f) => f?.toLowerCase().includes(q));
  });

  return (
    <div className="fi-page">
      {/* Navbar with Back button */}
      <header className="fi-navbar">
        <div className="fi-logo">Claimify</div>

        <button className="fi-back-btn" onClick={handleBack}>
          Back
        </button>
      </header>

      {/* Main content */}
      <main className="fi-main">
        <section className="fi-content">
          <h1 className="fi-title">Found Items</h1>

          {/* Search bar */}
          <div className="fi-search-wrapper">
            <div className="fi-search-bar">
              <span className="fi-search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search by name, location, category, brand, or color"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
          </div>

          {/* Loading / error state */}
          {loading && <p className="fi-status">Loading items...</p>}
          {!loading && error && <p className="fi-error">{error}</p>}

          {/* Cards */}
          {!loading && !error && (
            <div className="fi-cards-row">
              {filteredItems.map((item) => (
                <article className="fi-card" key={item.foundItemId}>
                  <div className="fi-card-header">
                    <div className="fi-card-meta">
                      <span className="fi-card-label">Item ID</span>
                      <span className="fi-card-value">{item.foundItemId}</span>
                    </div>
                    <div className="fi-card-meta">
                      <span className="fi-card-label">User ID</span>
                      <span className="fi-card-value">{item.username}</span>
                    </div>
                  </div>

                  {/* Thumbnail placeholder */}
                  <div className="fi-card-thumb" />

                  <div className="fi-card-body">
                    <div className="fi-item-name">{item.foundItemName}</div>
                    <div className="fi-item-text">
                      {item.location} • {item.category} • {item.color} •{" "}
                      {item.brand}
                    </div>
                    <div className="fi-item-text">Date: {item.foundDate}</div>
                  </div>

                  <div className="fi-card-footer">
                    <button className="fi-view-btn">View</button>
                  </div>
                </article>
              ))}

              {filteredItems.length === 0 && (
                <p className="fi-no-items">No items found.</p>
              )}
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="fi-footer">
        <div className="fi-footer-brand">
          Claimify – Campus Lost &amp; Found
        </div>

        <div className="fi-footer-columns">
          <div className="fi-footer-col">
            <div className="fi-footer-title">Product</div>
            <span>Features</span>
            <span>How it works?</span>
            <span>Pricing</span>
          </div>
          <div className="fi-footer-col">
            <div className="fi-footer-title">Support</div>
            <span>Help &amp; FAQ</span>
            <span>Contact</span>
            <span>Report a problem</span>
          </div>
          <div className="fi-footer-col">
            <div className="fi-footer-title">Campus</div>
            <span>About this project</span>
            <span>Team</span>
            <span>Privacy &amp; Terms</span>
          </div>
          <div className="footer-social">
            <div className="social-square">
              <FaFacebookF />
            </div>
            <div className="social-square">
              <FaLinkedinIn />
            </div>
            <div className="social-square">
              <FaYoutube />
            </div>
            <div className="social-square">
              <FaInstagram />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FoundItemsReport;
