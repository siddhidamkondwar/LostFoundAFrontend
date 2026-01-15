// LoginPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateUser } from "../../Services/LoginService";
import "./loginTheme.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setApiError("");
    setLoginData((values) => ({ ...values, [name]: value }));
  };

  const validateLogin = (e) => {
    e.preventDefault();
    setApiError("");
    validateUser(loginData.username, loginData.password)
      .then((response) => {
        const role = String(response.data);
        if (role === "Admin") navigate("/AdminMenu");
        else if (role === "Student") navigate("/StudentMenu");
        else setApiError("Invalid username or password");
      })
      .catch(() => setApiError("Login failed. Please try again."));
  };

  const handleValidation = (event) => {
    event.preventDefault();
    let tempErrors = {};
    let isValid = true;

    if (!loginData.username.trim()) {
      tempErrors.username = "User Name is required";
      isValid = false;
    }

    if (!loginData.password.trim()) {
      tempErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(tempErrors);
    if (isValid) validateLogin(event);
  };

  const gotoRegister = () => {
    navigate("/Register");
  };

  return (
    <div className="login-page-root">
      {/* background + blur ellipses */}
      <div className="login-bg">
        <div className="login-ellipse-left" />
        <div className="login-ellipse-right" />
      </div>

      {/* logo top-left */}
      <div className="login-logo-wrapper">
        <span className="login-logo-text">Clamify</span>
        <span className="login-logo-dot">.</span>
      </div>

      {/* heading text */}
      <div className="login-heading-wrapper">
        <div className="login-heading-title">Login Page</div>
        <div className="login-heading-subtitle">
          Start your journey with us now!!
        </div>
      </div>

      {/* main form card */}
      <div className="login-form-card">
        <form className="login-form-inner" onSubmit={handleValidation}>
          {/* Frame 10: title */}
          <div className="login-form-header">
            <div className="login-form-title">Login to your account</div>
          </div>

          {/* Frame 18: fields */}
          <div className="login-form-fields">
            {/* email */}
            <div className="login-field-group">
              <div className="login-field-label-row">
                <label className="login-field-label">Email</label>
              </div>
              <div className="login-input-wrapper login-input-wrapper-primary">
                <input
                  className="login-input-element"
                  name="username"
                  placeholder="balmvia@gmail.com"
                  value={loginData.username}
                  onChange={onChangeHandler}
                />
              </div>
              {errors.username && (
                <p className="login-error-text">{errors.username}</p>
              )}
            </div>

            {/* password */}
            <div className="login-field-group">
              <div className="login-field-label-row login-password-label-row">
                <label className="login-field-label">Password</label>
                <button
                  type="button"
                  className="login-forgot-btn"
                  onClick={() => {}}
                >
                  Forgot？
                </button>
              </div>
              <div className="login-input-wrapper">
                <input
                  className="login-input-element"
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={loginData.password}
                  onChange={onChangeHandler}
                />
                <div className="login-eye-placeholder" />
              </div>
              {errors.password && (
                <p className="login-error-text">{errors.password}</p>
              )}
            </div>

            {apiError && <p className="login-error-text">{apiError}</p>}
          </div>

          {/* button + bottom text */}
          <div className="login-form-footer">
            <button type="submit" className="login-submit-btn">
              <span className="login-submit-text">Login now</span>
            </button>

            <div className="login-bottom-row">
              <span className="login-bottom-text">
                Don’t Have An Account?
              </span>
              <span className="login-bottom-link" onClick={gotoRegister}>
                {" "}
                Sign Up
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
