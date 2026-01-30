import React from "react";
import "./signup.scss";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Signup = () => {
  const { t } = useTranslation();

  return (
    <div className="signup-page">
      <div className="signup-card">
        <div className="logo">🌾</div>

        <h1 className="title">
          <span className="green">KISSAAN</span>{" "}
          <span className="blue">SAATHI</span>
        </h1>

        <h2 className="welcome">{t("signup.welcome")}</h2>
        <p className="subtitle">{t("signup.create_account")}</p>

        <div className="phone-input">
          <span className="code">+91</span>
          <input
            type="tel"
            placeholder={t("signup.phone_placeholder")}
            maxLength="10"
          />
        </div>

        <select className="role-input" defaultValue="">
          <option value="" disabled hidden>
            {t("signup.role")}
          </option>
          <option value="farmer">{t("signup.farmer")}</option>
          <option value="buyer">{t("signup.buyer")}</option>
        </select>

        <p className="otp-text">
          {t("signup.otp_hint")}
        </p>

        <button className="btn-primary">
          {t("signup.continue")}
        </button>

        <p className="footer-text">
          {t("signup.already_account")}{" "}
          <Link to="/">{t("signup.login")}</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
