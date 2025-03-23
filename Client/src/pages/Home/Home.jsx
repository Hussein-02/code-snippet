/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import getBaseURL from "../../utils/baseURL";
import { useNavigate } from "react-router-dom";
import { javascript } from "@codemirror/lang-javascript";
import CodeMirror from "@uiw/react-codemirror";
import "./Home.css";

const Home = () => {
  const [snippets, setSnippets] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchSnippets = async (token) => {
    try {
      const response = await axios.get(`${getBaseURL()}/snippets`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.status) {
        setSnippets(response.data.snippets);
        setLoading(false);
      } else {
        console.error("Failed to fetch snippets");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching snippets:", error);
      setLoading(false);
    }
  };

  const filterSnippets = async (token) => {
    try {
      const response = await axios.get(`${getBaseURL()}/snippets?search=${searchQuery}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.status) {
        setSnippets(response.data.snippets);
        setLoading(false);
      } else {
        console.error("Failed to fetch snippets");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching snippets:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }

    fetchSnippets(token);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }

    filterSnippets(token);
  }, [searchQuery]);

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
  };

  if (loading) {
    return <div>Loading snippets...</div>;
  }

  return (
    <div className="body">
      <Navbar />
      <div className="search-container">
        <input
          className="search-bar"
          type="text"
          placeholder="Search.."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <a href="/snippet" className="plus-a">
          <button className="plus">+</button>
        </a>
      </div>
      {/* cards */}
      <div id="snippet-cards" className="cards-container">
        {snippets.length > 0 ? (
          snippets.map((snippet) => (
            <div key={snippet.id} className="snippet-card">
              <h3>{snippet.title}</h3>
              <p>
                <strong>Language:</strong> {snippet.language}
              </p>

              <div className="code-container">
                <CodeMirror
                  value={snippet.code}
                  height="150px"
                  extensions={[javascript()]}
                  theme="dark"
                  options={{ readOnly: true }}
                  editable={false}
                />
                <button className="copy-btn" onClick={() => copyToClipboard(snippet.code)}>
                  Copy
                </button>
              </div>

              {/* <p>{snippet.description}</p> */}
            </div>
          ))
        ) : (
          <p>No snippets found.</p>
        )}
      </div>

      {/* <div id="snippet-cards" className="cards-container">
        {snippets.length > 0 ? (
          snippets.map((snippet) => (
            <div key={snippet.id} className="snippet-card">
              <h3>{snippet.title}</h3>
              <p>
                <strong>Language:</strong> {snippet.language}
              </p>
              <pre>{snippet.code}</pre>
              <p>{snippet.description}</p>
            </div>
          ))
        ) : (
          <p>No snippets found.</p>
        )}
      </div> */}
    </div>
  );
};

export default Home;
