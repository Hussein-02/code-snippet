/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import getBaseURL from "../../utils/baseURL";
import axios from "axios";
import { javascript } from "@codemirror/lang-javascript";
import CodeMirror from "@uiw/react-codemirror";
import "./Snippet.css";

const Snippet = () => {
  //useRef is used to share a variable between functions
  const token = useRef("");
  const [form, setForm] = useState({
    title: "",
    code: "",
    language: "",
    description: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${getBaseURL()}/snippets`, form, {
        headers: {
          Authorization: `Bearer ${token.current}`,
        },
      });
      if (response.data.success) {
        navigate("/home");
      }
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  useEffect(() => {
    token.current = localStorage.getItem("token");
    if (!token.current) {
      navigate("/");
    }
  }, []);

  return (
    <div className="body">
      <h1 className="logo">CODE SNIPPET</h1>
      <div className="snippet-section">
        <h1>Add Snippet</h1>
        <form className="login-form" id="signupForm" onSubmit={handleSubmit}>
          <div className="login-input">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              onChange={(e) => {
                setForm({
                  ...form,
                  title: e.target.value,
                });
              }}
            />
          </div>

          <div className="login-input">
            <label htmlFor="language">Language</label>
            <input
              type="text"
              id="language"
              name="language"
              onChange={(e) => {
                setForm({
                  ...form,
                  language: e.target.value,
                });
              }}
            />
          </div>

          {/* <div className="login-input">
            <label htmlFor="code">Code</label>
            <input
            type="text"
            id="code"
            name="code"
            onChange={(e) => {
                setForm({
                    ...form,
                    code: e.target.value,
                    });
                    }}
                    />
                    </div> */}
          <div className="snippet-input">
            <label htmlFor="code">Code</label>
            <CodeMirror
              height="150px"
              extensions={[javascript()]}
              theme="dark"
              id="code"
              name="code"
              onChange={(value) => {
                setForm({
                  ...form,
                  code: value,
                });
              }}
            />
          </div>

          <div className="login-input">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              id="description"
              name="description"
              onChange={(e) => {
                setForm({
                  ...form,
                  description: e.target.value,
                });
              }}
            />
          </div>

          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
};

export default Snippet;
