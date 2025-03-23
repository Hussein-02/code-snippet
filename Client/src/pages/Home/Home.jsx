/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import getBaseURL from "../../utils/baseURL";
import { useNavigate } from "react-router-dom";
import { javascript } from "@codemirror/lang-javascript";
import CodeMirror from "@uiw/react-codemirror";
import "./Home.css";

const Home = () => {
  const shared_token = useRef("");
  const [snippets, setSnippets] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  //using this to rerender the page when favorite icon is pressed
  const [favorite, setFavorite] = useState(false);
  const [pressed, setPressed] = useState(false);

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
      } else {
        console.error("Failed to fetch snippets");
      }
    } catch (error) {
      console.error("Error fetching snippets:", error);
    } finally {
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

  const handleFavoriteFilter = async (shared_token) => {
    try {
      const url = !pressed ? `${getBaseURL()}/snippets?favorite` : `${getBaseURL()}/snippets`;

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${shared_token.current}`,
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

  const handleFavoriteButtonClick = () => {
    setPressed(!pressed);
    handleFavoriteFilter(shared_token);
  };

  const handleToggleFavorite = async (shared_token, snippet) => {
    try {
      await axios.patch(
        `${getBaseURL()}/snippets/${snippet.id}/favorite`,
        {},
        {
          headers: {
            Authorization: `Bearer ${shared_token.current}`,
          },
        }
      );
      setFavorite(!favorite);
    } catch (error) {
      console.error("There was an error toggling the favorite status!", error);
    }
  };

  //for when the user enters in the search bar
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }

    filterSnippets(token);
  }, [searchQuery]);

  //to fetch snippets when page renders and to change the favorite icon
  useEffect(() => {
    const token = localStorage.getItem("token");
    shared_token.current = token;
    if (!token) {
      navigate("/");
    }

    fetchSnippets(token);
  }, [favorite]);

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

        <a href="/add" className="plus-a">
          <button className="plus">+</button>
        </a>

        <button className="favorite-toggle" onClick={handleFavoriteButtonClick}>
          <img src={pressed ? "/favorite.png" : "/like.png"} alt="" />
        </button>
      </div>
      {/* cards */}
      <div id="snippet-cards" className="cards-container">
        {snippets.length > 0 ? (
          snippets.map((snippet) => (
            <div key={snippet.id} className="snippet-card">
              {snippet.is_favorite == 1 ? (
                <img
                  src="/favorite.png"
                  className="favorite-card"
                  alt="favorite"
                  onClick={() => handleToggleFavorite(shared_token, snippet)}
                />
              ) : (
                <img
                  src="/like.png"
                  className="favorite-card"
                  alt="favorite"
                  onClick={() => handleToggleFavorite(shared_token, snippet)}
                />
              )}

              <img
                src="/edit.png"
                className="edit-card"
                alt="Edit"
                onClick={() => navigate("/update", { state: { snippet } })}
              />
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
