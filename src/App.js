import React, { useState, useEffect } from "react";
import { Home, Posts } from "./components";
import { Route, Routes, Link } from "react-router-dom";
import { fetchPosts } from "./api/api";
import "./App.css";

const App = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const getPosts = async() => {
            try {
                const result = await fetchPosts();
                setPosts(result)
            } catch (error) {
                console.error(error);
            }
        }
        getPosts();
    }, [])
    return (
    <div className="container">
        <nav className="ui secondary menu">
            <Link className="item" to="/">Home</Link>
            <Link className="item" to="/posts">Posts</Link>
            
            <div className="right menu">
                <div className="item">

                </div>
            </div>
        </nav>

        <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route path="/posts" element={<Posts posts={posts}/>} />
        </Routes>
    </div>
    );
};

export default App;