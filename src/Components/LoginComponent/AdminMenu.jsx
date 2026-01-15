// src/Components/LoginComponents/AdminMenu.jsx
import React, { useState } from "react";
import ProfileMenu from "../../Components/LoginComponent/ProfileMenu.jsx";
import "./admintheme.css";

import { BiSolidCube, BiUser } from "react-icons/bi";
import { RiChat3Line, RiMessage3Line } from "react-icons/ri";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { HiOutlineClock } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa";

const AdminMenu = () => {
  const navigate = useNavigate();

  const [showProfileCard, setShowProfileCard] = useState(false);

  const admin = {
    name: localStorage.getItem("adminName") || "Admin Name",
    email: localStorage.getItem("adminEmail") || "admin@example.com",
  };

  const firstLetter = admin.name.charAt(0).toUpperCase();

  const stats = {
    totalLost: 24,
    totalFound: 18,
    unreadMessages: 5,
  };

  const lostItems = [
    {
      id: 1,
      title: "Wallet",
      location: "Library",
      date: "2026-01-09",
      status: "Pending",
    },
    {
      id: 2,
      title: "Keys",
      location: "Cafeteria",
      date: "2026-01-08",
      status: "Pending",
    },
  ];

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="admin-dashboard-page">
      {/* TOP HEADER CARD */}
      <header className="admin-header-card">
        <div className="admin-header-left">
          <h1 className="admin-title">Lost &amp; Found Admin Dashboard</h1>
          <p className="admin-subtitle">
            Manage and track all lost and found items.
          </p>
        </div>

        <div className="admin-header-right">
          {/* PROFILE BUTTON */}
          <button
            className="admin-profile-button"
            onClick={() => setShowProfileCard((prev) => !prev)}
          >
            <span className="admin-profile-icon">
              <BiUser className="admin-profile-icon-inner" />
            </span>
            <span className="admin-profile-label">Profile</span>
            <span className="admin-profile-caret" />
          </button>

          {/* SMALL PROFILE CARD */}
          {showProfileCard && (
            <div className="admin-profile-card">
              <div className="admin-profile-card-header">
                <div className="admin-profile-avatar">{firstLetter}</div>
                <div className="admin-profile-details">
                  <div className="admin-profile-name">{admin.name}</div>
                  <div className="admin-profile-email">{admin.email}</div>
                </div>
              </div>

              <button
                className="admin-profile-logout-button"
                onClick={handleLogout}
              >
                Log out
              </button>
            </div>
          )}

          <ProfileMenu />
        </div>
      </header>

      {/* STATS ROW */}
      <section className="admin-stats-row">
        <div className="admin-stat-card admin-stat-lost">
          <div className="admin-stat-label">Total Lost Items</div>
          <div className="admin-stat-content">
            <span className="admin-stat-value">{stats.totalLost}</span>
            <span className="admin-stat-icon">
              <BiSolidCube className="admin-stat-icon-inner lost" />
            </span>
          </div>
        </div>

        <div className="admin-stat-card admin-stat-found">
          <div className="admin-stat-label">Total Found Items</div>
          <div className="admin-stat-content">
            <span className="admin-stat-value">{stats.totalFound}</span>
            <span className="admin-stat-icon">
              <BiSolidCube className="admin-stat-icon-inner found" />
            </span>
          </div>
        </div>

        <div className="admin-stat-card admin-stat-messages">
          <div className="admin-stat-label">Unread Messages</div>
          <div className="admin-stat-content">
            <span className="admin-stat-value">{stats.unreadMessages}</span>
            <span className="admin-stat-icon admin-stat-icon-messages">
              <RiMessage3Line className="admin-stat-icon-inner messages" />
            </span>
          </div>
        </div>
      </section>

      {/* NAVIGATION TABS */}
      <section className="admin-nav-section">
        <h2 className="admin-nav-title">Navigation Menu</h2>

        <div className="admin-nav-tabs">
          {/* Lost Items */}
          <button
            className="admin-nav-tab admin-nav-tab-active"
            onClick={() => navigate("/LostItemReport")}
          >
            <span className="admin-nav-tab-icon">
              <BiSolidCube className="admin-nav-icon-inner" />
            </span>
            <span className="admin-nav-tab-text-main">Lost Items</span>
            <span className="admin-nav-tab-text-sub">View lost items</span>
          </button>

          {/* Found Items */}
          <button
            className="admin-nav-tab"
            onClick={() => navigate("/FoundItemReport")}
          >
            <span className="admin-nav-tab-icon">
              <BiSolidCube className="admin-nav-icon-inner" />
            </span>
            <span className="admin-nav-tab-text-main">Found Items</span>
            <span className="admin-nav-tab-text-sub">View found items</span>
          </button>

          {/* Match Items (NEW) */}
          <button
            className="admin-nav-tab"
            onClick={() => navigate("/MatchItemSearch")}
          >
            <span className="admin-nav-tab-icon">
              <BiSolidCube className="admin-nav-icon-inner" />
            </span>
            <span className="admin-nav-tab-text-main">Match Items</span>
            <span className="admin-nav-tab-text-sub">
              Auto / manual matches
            </span>
          </button>

          {/* Chatting */}
          <button
            className="admin-nav-tab"
            onClick={() => navigate("/ChatMessage")}
          >
            <span className="admin-nav-tab-icon">
              <RiChat3Line className="admin-nav-icon-inner" />
            </span>
            <span className="admin-nav-tab-text-main">Chatting</span>
            <span className="admin-nav-tab-text-sub">
              Messages &amp; support
            </span>
          </button>

          {/* Student List */}
          <button
            className="admin-nav-tab"
            onClick={() => navigate("/StudentList")}
          >
            <span className="admin-nav-tab-icon">
              <HiOutlineUserGroup className="admin-nav-icon-inner" />
            </span>
            <span className="admin-nav-tab-text-main">Student List</span>
            <span className="admin-nav-tab-text-sub">Manage students</span>
          </button>
        </div>
      </section>

      {/* LOST ITEMS LIST CARD */}
      <section className="admin-list-section">
        <div className="admin-list-header">
          <h2 className="admin-list-title">Lost Items List</h2>
          <p className="admin-list-subtitle">
            Manage all lost items reported by users. You can update status,
            contact users, and mark items as resolved.
          </p>
        </div>

        <div className="admin-list-card">
          {lostItems.map((item) => (
            <div key={item.id} className="admin-list-item">
              <div className="admin-list-item-left">
                <div className="admin-list-item-icon">
                  <BiSolidCube className="admin-list-icon-inner" />
                </div>
                <div className="admin-list-item-text">
                  <div className="admin-list-item-title">{item.title}</div>
                  <div className="admin-list-item-meta">
                    <span className="admin-list-item-location">
                      {item.location}
                    </span>
                    <span className="admin-list-item-separator">•</span>
                    <span className="admin-list-item-date">
                      <HiOutlineClock className="admin-list-clock-icon" />
                      {item.date}
                    </span>
                  </div>
                </div>
              </div>

              <div className="admin-list-item-right">
                <span className="admin-status-pill admin-status-pending">
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="footer-main">
        <div className="footer-divider" />

        <div className="footer-brand-row">
          <div className="footer-brand-text">
            Claimify – Campus Lost &amp; Found
          </div>

          <div className="footer-links-columns">
            <div className="footer-col">
              <div className="footer-col-title">Product</div>
              <div className="footer-link">Features</div>
              <div className="footer-link">How it works?</div>
              <div className="footer-link">Pricing</div>
            </div>

            <div className="footer-col">
              <div className="footer-col-title">Support</div>
              <div className="footer-link">Help &amp; FAQ</div>
              <div className="footer-link">Contact</div>
              <div className="footer-link">Report a problem</div>
            </div>

            <div className="footer-col">
              <div className="footer-col-title">Campus</div>
              <div className="footer-link">About this project</div>
              <div className="footer-link">Team</div>
              <div className="footer-link">Privacy &amp; Terms</div>
            </div>
          </div>
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
      </footer>
    </div>
  );
};

export default AdminMenu;
