import "./Login.scss";
import {PersonStanding} from 'lucide-react'
import Accessibility from './Accessibility'
import { Link } from "react-router-dom";
const Login = () => {
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

        <Accessibility/>

        <div className="form">
          <h2 className="welcome-msg">WELCOME</h2>

          <label>Enter your mobile number</label>

         <div className="phone-input">
        <span className="country-code">+91</span>
        <input
            type="tel"
            placeholder="XXXXXXXXXX"
            maxLength={10}
        />
        </div>

          <p className="hint">
            We'll send an OTP to verify your account
          </p>

          <button className="cnt-btn">Continue</button>

          <p className="signup">
            Don't have an account? <Link to={'./Signup'}><span className="create-new">Create new</span></Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
