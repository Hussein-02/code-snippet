/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import getBaseURL from "../../utils/baseURL";
import axios from "axios";
import { javascript } from "@codemirror/lang-javascript";
import CodeMirror from "@uiw/react-codemirror";
import "./Update.css";

const Update = () => {
  //useRef is used to share a variable between functions
  const token = useRef("");
  const navigate = useNavigate();
  const location = useLocation();
  const snippet = location.state?.snippet || {};

  const [form, setForm] = useState({
    title: snippet.title,
    code: snippet.code,
    language: snippet.language,
    description: snippet.description,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${getBaseURL()}/snippets/${snippet.id}`, form, {
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

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(`${getBaseURL()}/snippets/${snippet.id}`, {
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
              value={form.title}
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
              value={form.language}
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
              value={form.code}
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
              value={form.description}
              onChange={(e) => {
                setForm({
                  ...form,
                  description: e.target.value,
                });
              }}
            />
          </div>

          <input type="submit" value="Submit" />
          <button className="signup-btn" onClick={handleDelete}>
            Delete Photo
          </button>
        </form>
      </div>
    </div>
  );
};

export default Update;
