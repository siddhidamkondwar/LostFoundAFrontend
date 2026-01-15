// LandingPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa";

// images
import heroImg from "./hero.svg";
import lost1 from "./lost1.svg";
import lost2 from "./lost2.svg";
import lost3 from "./lost3.svg";
import howImg from "./how.svg";
import benefit1 from "./benefit1.svg";
import benefit2 from "./benefit2.svg";
import claimifyLogo from "./clamify-logo.png"; // logo added

const LandingPage = () => {
  const [activeCard, setActiveCard] = useState(null); // "about" | "contact" | null
  const navigate = useNavigate();

  const openCard = (type) => setActiveCard(type);
  const closeCard = () => setActiveCard(null);

  const handleLogin = () => navigate("/login");
  const handleSignup = () => navigate("/register");

  return (
    <div className="landing-page">
      {/* TOP NAVIGATION */}
      <header className="nav-main">
        <div className="nav-left">
          <img
            src={claimifyLogo}
            alt="Claimify Lost and Found logo"
            className="nav-logo"
          />
          {/* <div className="nav-site-name">Claimify</div> */}
        </div>

        <nav className="nav-items">
          <button
            className="nav-link-about"
            onClick={() => openCard("about")}
          >
            About
          </button>
          <button
            className="nav-link-contact"
            onClick={() => openCard("contact")}
          >
            Contact Us
          </button>

          <div className="nav-auth">
            <button className="nav-login" onClick={handleLogin}>
              Log in
            </button>
            <button className="nav-signup-btn" onClick={handleSignup}>
              Sign Up
            </button>
          </div>
        </nav>
      </header>

      {/* HERO SECTION */}
      <section className="hero-copy">
        <div className="hero-page-title">
          <h1 className="hero-heading">
            The Smart Lost &amp; Found System for Campus
          </h1>
          <p className="hero-subheading">
            Report lost items, track found belongings and connect students in
            one simple platform.
          </p>
        </div>
      </section>

      <div className="hero-image-wrapper">
        <img src={heroImg} alt="Lost and found hero" className="hero-image" />
      </div>

      {/* LOST & FOUND SECTION */}
      <section className="section-lost-found">
        <h2 className="lost-found-heading">Lost &amp; Found</h2>

        <div className="lost-cards">
          <article className="lost-card">
            <div className="lost-card-img-wrap">
              <img src={lost1} alt="Find lost items faster" />
            </div>
            <div className="lost-card-copy">
              <div className="lost-card-title">Find Lost Items Faster</div>
            </div>
          </article>

          <article className="lost-card">
            <div className="lost-card-img-wrap">
              <img src={lost2} alt="Smart lost & found for campus" />
            </div>
            <div className="lost-card-copy">
              <div className="lost-card-title">
                The Smart Lost &amp; Found for Campus
              </div>
            </div>
          </article>

          <article className="lost-card">
            <div className="lost-card-img-wrap">
              <img src={lost3} alt="Get it back in minutes" />
            </div>
            <div className="lost-card-copy">
              <div className="lost-card-title">
                Lost Something? Get It Back in Minutes
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="section-how">
        <h2 className="how-heading">How it works?</h2>

        <div className="how-layout">
          <div className="how-text-blocks">
            <div className="how-text-block">
              <p className="how-text">
                Post a lost or found item with photos and details.
              </p>
            </div>
            <div className="how-text-block">
              <p className="how-text">
                Our system matches reports and notifies the right students
                instantly.
              </p>
            </div>
            <div className="how-text-block">
              <p className="how-text">
                Meet on campus or at the help desk to hand over the item safely.
              </p>
            </div>
          </div>

          <div className="how-image-wrap">
            <img src={howImg} alt="How it works" className="how-image" />
          </div>
        </div>
      </section>

      {/* KEY BENEFITS SECTION */}
      <section className="section-benefits">
        <h2 className="benefits-heading">Key benefits</h2>

        <div className="benefit-cards">
          <article className="benefit-card">
            <div className="benefit-img-wrap">
              <img src={benefit1} alt="Centralised lost and found desk" />
            </div>
            <div className="benefit-copy">
              <p className="benefit-text">
                Centralised lost &amp; found desk in your pocket – no more
                running to notice boards or offices.
              </p>
            </div>
          </article>

          <article className="benefit-card">
            <div className="benefit-img-wrap">
              <img src={benefit2} alt="Verified student accounts" />
            </div>
            <div className="benefit-copy">
              <p className="benefit-text">
                Built for campus: verified student accounts keep exchanges safe
                and trustworthy.
              </p>
            </div>
          </article>
        </div>
      </section>

      {/* REVIEWS & FEEDBACK */}
      <section className="section-reviews">
        <h2 className="reviews-heading">Reviews &amp; Feedback</h2>

        <div className="reviews-cards">
          <article className="review-card">
            <div className="review-title">Found my ID in hours</div>
            <div className="review-avatar-row">
              <div className="review-avatar" />
              <div className="review-meta">
                <div className="review-name">Aditi Sharma</div>
                <div className="review-role">Student</div>
              </div>
            </div>
          </article>

          <article className="review-card">
            <div className="review-title">Super easy to report items</div>
            <div className="review-avatar-row">
              <div className="review-avatar" />
              <div className="review-meta">
                <div className="review-name">Rahul Verma</div>
                <div className="review-role">Student</div>
              </div>
            </div>
          </article>

          <article className="review-card">
            <div className="review-title">Campus feels safer with this</div>
            <div className="review-avatar-row">
              <div className="review-avatar" />
              <div className="review-meta">
                <div className="review-name">Neha Patel</div>
                <div className="review-role">Student</div>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="cta-section">
        <h2 className="cta-heading">
          Create a free account and start tracking lost and found items in
          seconds
        </h2>
      </section>

      {/* FOOTER */}
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

      {/* ABOUT / CONTACT OVERLAY CARDS */}
      {activeCard && (
        <>
          <div className="lp-overlay" onClick={closeCard} />

          <div className={`lp-card lp-card-${activeCard}`}>
            <button className="lp-card-close" onClick={closeCard}>
              &times;
            </button>

            {activeCard === "about" && (
              <div className="lp-card-content">
                <h2>About Claimify</h2>
                <p>
                  Claimify is a smart campus lost-and-found platform designed to
                  help students quickly reconnect with their missing belongings.
                  Users can easily post detailed reports about lost or found
                  items, including photos, locations and descriptions, making it
                  simple for others to identify matches. Claimify centralises
                  all campus lost-and-found activity in one secure place,
                  reducing confusion from scattered notice boards, social media
                  posts or word-of-mouth updates. With a clean interface and
                  verified student accounts, the app encourages responsible
                  reporting, faster item recovery and a more connected,
                  trustworthy campus community.
                </p>
              </div>
            )}

            {activeCard === "contact" && (
              <div className="lp-card-content">
                <h2>Contact Us</h2>
                <p>
                  Have a question, found a bug, or need help with a lost item?
                  Reach out to the Claimify team anytime at{" "}
                  <strong>support@claimify.app</strong> or visit the campus help
                  desk. We’ll respond as soon as possible.
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default LandingPage;
