import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../Services/LoginService";
import "./profilemenu.css";

const ProfileMenu = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  // fetch logged-in user (name, email)
  useEffect(() => {
  const storedUser = JSON.parse(localStorage.getItem("claimifyUser"));
  if (storedUser) {
    setUser(storedUser);
  }
}, []);

  // close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logoutUser().then(() => {
      localStorage.clear();
      sessionStorage.clear();
      navigate("/");
    });
  };

  if (!user) return null;

 const avatarLetter = (user.name || "U").charAt(0).toUpperCase();


  return (
    <div className="profile-wrapper" ref={menuRef}>
      <div className="profile-avatar" onClick={() => setOpen(!open)}>
        {avatarLetter}
      </div>

      {open && (
        <div className="profile-dropdown">
          <div className="profile-header">
            <div className="profile-avatar large">{avatarLetter}</div>
            <div className="profile-info">
              <div className="profile-name">{user.name}</div>
              <div className="profile-email">{user.email}</div>
            </div>
          </div>

          <div className="profile-divider" />

          <button className="profile-logout" onClick={handleLogout}>
            Log out
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
