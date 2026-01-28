import React from "react";
import "./signup.scss";
import { Link } from "react-router-dom";
const Signup = () => {
  return (
    <div className="signup-page">
      <div className="signup-card">
        <div className="logo">🌾</div>

        <h1 className="title">
          <span className="green">KISSAAN</span>{" "}
          <span className="blue">SAATHI</span>
        </h1>

        <h2 className="welcome">WELCOME</h2>
        <p className="subtitle">Create your account</p>

        <div className="phone-input">
          <span className="code">+91</span>
          <input
            type="tel"
            placeholder="XXXXXXXXXX"
            maxLength="10"
          />
        </div>

        <p className="otp-text">
          We'll send an OTP to verify your account
        </p>

        <button className="btn-primary">Continue</button>

        <p className="footer-text">
          Already have an account? <Link to={'/'}>Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;

