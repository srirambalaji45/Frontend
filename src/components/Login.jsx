import "./Login.scss";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const API = "http://localhost:5000/api/auth";

const Login = () => {
  const nav = useNavigate();
  const { t } = useTranslation();

  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleContinue = async (e) => {
    e.preventDefault();
    setMsg("");

    const trimmed = phone.trim();
    if (!/^\d{10}$/.test(trimmed)) {
      setMsg(t("auth.invalid_phone"));
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `${API}/login`,
        { phone: trimmed },
        { headers: { "Content-Type": "application/json" } }
      );

      if (res.data?.success) {
        const userId = res.data?.data?._id;
        const requestId = res.data?.requestId;

        localStorage.setItem("phone", trimmed);
        if (userId) localStorage.setItem("userId", userId);
        if (requestId) localStorage.setItem("requestId", requestId);

        nav("/verify", { state: { phone: trimmed, userId, requestId } });
      } else {
        setMsg(res.data?.message || t("auth.otp_send_failed"));
      }
    } catch (err) {
      setMsg(err?.response?.data?.message || err.message || t("auth.login_failed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="bg-overlay"></div>

      <div className="login-wrapper">
        <div className="brand">
          <img src="/logo.png" alt="logo" />
          <h1 className="app-name">
            <span className="green">KISSAAN</span>{" "}
            <span className="blue">SAATHI</span>
          </h1>
        </div>

        <form className="form" onSubmit={handleContinue}>
          <h2 className="welcome-msg">{t("auth.welcome")}</h2>

          <label>{t("auth.enter_phone")}</label>

          <div className="phone-input">
            <span className="country-code">+91</span>
            <input
              type="tel"
              placeholder={t("auth.phone_placeholder")}
              maxLength={10}
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
            />
          </div>

          <p className="hint">{t("auth.otp_hint")}</p>

          {msg ? <p className="error-msg">{msg}</p> : null}

          <button className="cnt-btn" type="submit" disabled={loading}>
            {loading ? t("auth.sending_otp") : t("auth.continue")}
          </button>

          <p className="signup">
            {t("auth.no_account")}{" "}
            <Link to="/signup">
              <span className="create-new">{t("auth.create_new")}</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
