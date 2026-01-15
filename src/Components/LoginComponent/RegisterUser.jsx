// RegisterUser.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerNewUser } from "../../Services/LoginService";
import "./registertheme.css";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";

const RegisterUser = () => {
  const [lostFoundUser, setLostFoundUser] = useState({
    username: "",
    password: "",
    personalName: "",
    email: "",
    role: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const navigate = useNavigate();

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setLostFoundUser((values) => ({ ...values, [name]: value }));
  };

  const createNewUser = async () => {
    await registerNewUser(lostFoundUser);
    setShowSuccess(true);
  };

  const handleValidation = async (event) => {
    event.preventDefault();
    let tempErrors = {};
    let isValid = true;

    if (!lostFoundUser.username.trim()) {
      tempErrors.username = "User Name is required";
      isValid = false;
    }

    if (!lostFoundUser.password.trim()) {
      tempErrors.password = "Password is required";
      isValid = false;
    } else if (
      lostFoundUser.password.length < 5 ||
      lostFoundUser.password.length > 10
    ) {
      tempErrors.password = "Password must be 5-10 characters long";
      isValid = false;
    } else if (lostFoundUser.password !== confirmPassword) {
      tempErrors.password = "Both the passwords are not matched";
      isValid = false;
    }

    if (!lostFoundUser.personalName.trim()) {
      tempErrors.personalName = "Personal Name is required";
      isValid = false;
    }

    if (!lostFoundUser.email.trim()) {
      tempErrors.email = "Email is required";
      isValid = false;
    } else if (!emailPattern.test(lostFoundUser.email)) {
      tempErrors.email = "Invalid Email Format";
      isValid = false;
    }

    if (!lostFoundUser.role.trim()) {
      tempErrors.role = "Role is required";
      isValid = false;
    }

    if (!confirmPassword.trim()) {
      tempErrors.confirmPassword = "Confirm Password is required";
      isValid = false;
    }

    setErrors(tempErrors);

    if (isValid) {
      await createNewUser();
    }
  };

  const handleSuccessOk = () => {
    setShowSuccess(false);
    navigate("/"); // go back to login
  };

  return (
    <div className="signup-page">
      {/* background image */}
      <div className="signup-bg" />

      {/* heading */}
      <h1 className="signup-title">Create an account</h1>

      {/* glassmorphism form card */}
      <div className="signup-form-wrapper">
        <form className="signup-form" onSubmit={handleValidation}>
          {/* social buttons row */}
          <div className="signup-social-row">
            <button type="button" className="social-btn social-google">
           <FcGoogle className="social-icon" />
              <span className="social-text">Google</span>
            </button>
            <button type="button" className="social-btn social-facebook">
                  <FaFacebookF className="social-icon" />
              <span className="social-icon-placeholder" />
              <span className="social-text">Facebook</span>
            </button>
          </div>

          {/* OR text */}
          <div className="signup-or">Or</div>

          {/* username */}
          <div className="signup-field-group">
            <div className="signup-label-row">
              <label className="signup-label">Username</label>
            </div>
            <div className="signup-input-wrapper signup-input-wrapper-primary">
              <input
                className="signup-input"
                name="username"
                placeholder="Username"
                value={lostFoundUser.username}
                onChange={onChangeHandler}
              />
            </div>
            {errors.username && (
              <p className="signup-error">{errors.username}</p>
            )}
          </div>

          {/* password */}
          <div className="signup-field-group">
            <div className="signup-label-row">
              <label className="signup-label">Password</label>
              <button type="button" className="signup-forgot-btn">
                Forgot？
              </button>
            </div>
            <div className="signup-input-wrapper">
              <input
                className="signup-input"
                type="password"
                name="password"
                placeholder="Enter your password"
                value={lostFoundUser.password}
                onChange={onChangeHandler}
              />
              <div className="signup-eye-placeholder" />
            </div>
            {errors.password && (
              <p className="signup-error">{errors.password}</p>
            )}
          </div>

          {/* confirm password */}
          <div className="signup-field-group">
            <div className="signup-label-row">
              <label className="signup-label">Retype your Password</label>
            </div>
            <div className="signup-input-wrapper">
              <input
                className="signup-input"
                type="password"
                name="confirmPassword"
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <div className="signup-eye-placeholder" />
            </div>
            {errors.confirmPassword && (
              <p className="signup-error">{errors.confirmPassword}</p>
            )}
          </div>

          {/* personal name */}
          <div className="signup-field-group">
            <div className="signup-label-row">
              <label className="signup-label">User Personal Name</label>
            </div>
            <div className="signup-input-wrapper signup-input-wrapper-primary">
              <input
                className="signup-input"
                name="personalName"
                placeholder="Personal Name"
                value={lostFoundUser.personalName}
                onChange={onChangeHandler}
              />
            </div>
            {errors.personalName && (
              <p className="signup-error">{errors.personalName}</p>
            )}
          </div>

          {/* email */}
          <div className="signup-field-group">
            <div className="signup-label-row">
              <label className="signup-label">User Email</label>
            </div>
            <div className="signup-input-wrapper signup-input-wrapper-primary">
              <input
                className="signup-input"
                name="email"
                placeholder="balmvia@gmail.com"
                value={lostFoundUser.email}
                onChange={onChangeHandler}
              />
            </div>
            {errors.email && <p className="signup-error">{errors.email}</p>}
          </div>

          {/* role */}
          <div className="signup-field-group">
            <div className="signup-label-row">
              <label className="signup-label">Select Role</label>
            </div>
            <div className="signup-input-wrapper signup-input-wrapper-primary">
              <input
                list="types"
                name="role"
                className="signup-input"
                placeholder="Role"
                value={lostFoundUser.role}
                onChange={onChangeHandler}
              />
              <datalist id="types">
                <option value="Student" />
                <option value="Admin" />
              </datalist>
            </div>
            {errors.role && <p className="signup-error">{errors.role}</p>}
          </div>

          {/* submit button */}
          <button type="submit" className="signup-submit-btn">
            <span className="signup-submit-text">Create account</span>
          </button>
        </form>
      </div>

      {/* success overlay */}
      {showSuccess && (
        <div className="success-overlay">
          <div className="success-card">
            <h3>Student registered successfully</h3>
            <div className="tick-wrapper">
              <div className="tick-circle">
                <span className="tick-mark">✓</span>
              </div>
            </div>
            <button className="success-ok-btn" onClick={handleSuccessOk}>
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterUser;
