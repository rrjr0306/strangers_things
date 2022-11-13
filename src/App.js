import React, { useState, useEffect } from "react";
import { Home, Posts, AccountForm, CreatePostFrom } from "./components";
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import { fetchPosts, fetchGuest } from "./api/api";
import "./App.css";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(
    window.localStorage.getItem("token") || null
  );
  const [guest, setGuest] = useState(null);
  
  const navigate = useNavigate();

  useEffect(() => {
    const getPosts = async () => {
        const {error, posts} = await fetchPosts(token);

        if (error) {
            console.error(error);
        }
        setPosts(posts);
      };
    getPosts();
  }, []);

  useEffect(() => {
    if (token) {
        const getGuest = async () => {
            const { username } = await fetchGuest(token);
            console.log("username", username);
            setGuest(username)
        };
        getGuest();
    }
  }, [token]);

  useEffect(() => {
    if (token) {
        window.localStorage.setItem("token", token);
    } else {
        window.localStorage.removeItem("token");
    }    
  }, [token]);

  const logOut = () => {
    setToken("");
    navigate("/");
    setGuest(null);
  }

  return (
    <div className="container">
      <nav className="ui secondary menu">
        <Link className="item" to="/">
          Home
        </Link>
        <Link className="item" to="/posts">
          Posts
        </Link>
        <div className="right menu">
          {token ? (
            <button onClick={logOut} className="item">Log Out</button>
          ) : (
            <>
              <Link className="item" to="/account/login">
                Log In
              </Link>
              <Link className="item" to="/account/register">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>

      <Routes>
        <Route exact path="/" element={<Home guest={guest} />} />
        <Route path="/posts/create" element={<CreatePostFrom token={token} setPosts={setPosts} />} />
        <Route path="/posts" element={<Posts posts={posts} token={token} setPosts={setPosts} />} />
        <Route
          path="/account/:action"
          element={<AccountForm setToken={setToken} />}
        />
      </Routes>
    </div>
  );
};

export default App;
