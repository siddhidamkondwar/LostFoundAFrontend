import React, { useEffect, useState } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import "./StudentTheme.css";

import {
  FaFacebookF,
  FaLinkedinIn,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa";
import { BiSolidCube } from "react-icons/bi";
import { RiChat3Line } from "react-icons/ri";

import heroTop from "./hero-top.svg";
import heroMain from "./hero-main.svg";
import heroBottom from "./hero-bottom.svg";
import claimifyLogo from "./clamify-logo.png"; // logo added

import { FaRegUser } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";


const StudentMenu = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "Student User",
    email: "email@example.com",
  });

  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("claimifyUser");

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);

        setUser({
          name: parsedUser.name || "Student User",
          email: parsedUser.email || "email@example.com",
        });
      } catch (err) {
        console.error("Invalid user data in localStorage", err);
      }
    }
  }, []);

  const toggleProfile = () => setIsProfileOpen((prev) => !prev);
  const closeProfile = () => setIsProfileOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("claimifyUser");
    navigate("/");
  };

  return (
    <div className="student-page">
      <div className="student-shell">
        {/* Top navbar */}
        <header className="student-header">
          <div className="nav-inner">
            <div className="nav-left">
              <img
                src={claimifyLogo}
                alt="Claimify Lost and Found logo"
                className="student-nav-logo"
              />
            </div>

            <Navbar expand="lg" className="nav-right">
              <Navbar.Toggle aria-controls="student-navbar-nav" />
              <Navbar.Collapse id="student-navbar-nav">
                {/* LEFT: 3 navigation cards */}
                <div className="student-nav-tabs student-nav-tabs-in-header">
                  {/* Lost Items */}
                  <button
                    className="student-nav-tab student-nav-tab-active"
                    onClick={() => navigate("/LostItemReport")}
                  >
                    <span className="student-nav-tab-icon">
                      <BiSolidCube className="student-nav-icon-inner" />
                    </span>
                    <span className="student-nav-tab-text-main">
                      Lost Items
                    </span>
                    <span className="student-nav-tab-text-sub">
                      View lost items
                    </span>
                  </button>

                  {/* Found Items */}
                  <button
                    className="student-nav-tab"
                    onClick={() => navigate("/FoundItemReport")}
                  >
                    <span className="student-nav-tab-icon">
                      <BiSolidCube className="student-nav-icon-inner" />
                    </span>
                    <span className="student-nav-tab-text-main">
                      Found Items
                    </span>
                    <span className="student-nav-tab-text-sub">
                      View found items
                    </span>
                  </button>

                  {/* Chatting */}
                  <button
                    className="student-nav-tab"
                    onClick={() => navigate("/ChatMessage")}
                  >
                    <span className="student-nav-tab-icon">
                      <RiChat3Line className="student-nav-icon-inner" />
                    </span>
                    <span className="student-nav-tab-text-main">Chatting</span>
                    <span className="student-nav-tab-text-sub">
                      Messages &amp; support
                    </span>
                  </button>
                </div>

                {/* RIGHT: profile dropdown button */}
                <Nav className="ms-auto align-items-center">
                 <div className="profile-wrapper">
  <button
    className="profile-btn"
    type="button"
    onClick={toggleProfile}
  >
    <span className="profile-btn-icon">
      <FaRegUser />
    </span>
    <span className="profile-btn-label">Profile</span>
    <span className={`profile-btn-caret ${isProfileOpen ? "open" : ""}`}>
      <IoIosArrowDown />
    </span>
  </button>

                    {isProfileOpen && (
                      <>
                        <div
                          className="profile-overlay"
                          onClick={closeProfile}
                        />

                        <div className="profile-card">
                          <div className="profile-card-header">
                            <div className="profile-avatar-circle">
                              {user.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="profile-card-name">
                              {user.name}
                            </div>
                            <div className="profile-card-email">
                              {user.email}
                            </div>
                          </div>

                          <div className="profile-card-body">
                            <button
                              type="button"
                              className="profile-logout-btn"
                              onClick={handleLogout}
                            >
                              Log out
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </div>
        </header>

        {/* Hero */}
        <main className="student-main">
          <h1 className="hero-heading_1">Find &amp; Recover With Ease</h1>
          <p className="hero-desc">
            Experience effortless recovery with our lost and found service
          </p>

          {/* bottom row: buttons left, images right */}
          <div className="hero-bottom-row">
            <div className="hero-buttons">
              <button
                className="lost-btn"
                onClick={() => navigate("/LostItemEntry")}
              >
                Lost
              </button>
              <button
                className="found-btn"
                onClick={() => navigate("/FoundItemEntry")}
              >
                Found
              </button>
            </div>

            <div className="hero-images">
              <img
                src={heroTop}
                className="hero-img hero-img-left"
                alt="hero left"
              />
              <img
                src={heroMain}
                className="hero-img hero-img-center"
                alt="hero center"
              />
              <img
                src={heroBottom}
                className="hero-img hero-img-right"
                alt="hero right"
              />
            </div>
          </div>
        </main>

        {/* Recent activity */}
        <section className="activity-section">
          <div className="activity-card">
            <h2 className="activity-title">Recent Activity</h2>

            <div className="activity-row">
              <span className="dot dot-red" />
              <span className="activity-text">
                You reported: Black Backpack – 20 Dec
              </span>
            </div>

            <div className="activity-row">
              <span className="dot dot-blue" />
              <span className="activity-text">
                New match found for: Physics Book – 21 Dec
              </span>
            </div>

            <div className="activity-row">
              <span className="dot dot-green" />
              <span className="activity-text">
                You returned: ID Card – 18 Dec
              </span>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="student-footer">
          <div className="footer-brand">
            Claimify – Campus Lost &amp; Found
          </div>

          <div className="footer-cols">
            <div className="footer-col">
              <div className="footer-heading">Product</div>
              <div className="footer-link">Features</div>
              <div className="footer-link">How it works?</div>
              <div className="footer-link">Pricing</div>
            </div>

            <div className="footer-col">
              <div className="footer-heading">Support</div>
              <div className="footer-link">Help &amp; FAQ</div>
              <div className="footer-link">Contact</div>
              <div className="footer-link">Report a problem</div>
            </div>

            <div className="footer-col">
              <div className="footer-heading">Campus</div>
              <div className="footer-link">About this project</div>
              <div className="footer-link">Team</div>
              <div className="footer-link">Privacy &amp; Terms</div>
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
    </div>
  );
};

export default StudentMenu;
