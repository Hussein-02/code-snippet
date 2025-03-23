/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import getBaseURL from "../../utils/baseURL";
import axios from "axios";

const Photo = () => {
  const [token, setToken] = useState("");
  const [form, setForm] = useState({
    user_id: "",
    title: "",
    description: "",
    tags: "",
    image_path: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e, token) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${getBaseURL()}/addPhoto.php`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.status) {
        navigate("/home");
      }
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    if (!token) {
      navigate("/");
    }
  }, []);

  return (
    <div className="body">
      <h1 className="logo">CODE SNIPPET</h1>
      <div className="photo-section">
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

          <div className="login-input">
            <label htmlFor="tags">Tags</label>
            <input
              type="text"
              id="tags"
              name="tags"
              onChange={(e) => {
                setForm({
                  ...form,
                  tags: e.target.value,
                });
              }}
            />
          </div>
          <div className="file-input">
            <label htmlFor="image_path" className="custom-file-upload">
              Upload Image
            </label>
          </div>

          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
};

export default Photo;
