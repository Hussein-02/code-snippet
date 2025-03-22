import { useNavigate } from "react-router-dom";
import getBaseURL from "../../utils/baseURL";
import React, { useState } from "react";
import axios from "axios";
import "./Signup.css";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${getBaseURL()}/register`, form, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data.success) {
        const token = response.data.token;
        localStorage.setItem("token", token);

        navigate("/home");
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="body">
      <h1 className="logo">CODE SNIPPET</h1>
      <div className="login-section">
        <h1>Sign Up</h1>
        <form className="login-form" id="signupForm" onSubmit={handleSubmit}>
          <div className="login-input">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              // value={fullname}
              onChange={(e) => {
                setForm({
                  ...form,
                  name: e.target.value,
                });
              }}
            />
          </div>

          <div className="login-input">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              // value={email}
              onChange={(e) => {
                setForm({
                  ...form,
                  email: e.target.value,
                });
              }}
            />
          </div>

          <div className="login-input">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              // value={password}
              onChange={(e) => {
                setForm({
                  ...form,
                  password: e.target.value,
                });
              }}
            />
          </div>

          <input type="submit" value="Sign Up" />
        </form>
      </div>
    </div>
  );
};

export default Signup;
