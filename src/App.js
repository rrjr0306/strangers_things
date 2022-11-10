import React, { useState, useEffect } from "react";
import { Home, Posts } from "./components";
import { Route, Routes, Link } from "react-router-dom";
import { fetchPosts } from "./api/api";

const App = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async() => {
            try {
                const result = await fetchPosts();
                setPosts(result)
            } catch (error) {
                console.error(error);
            }
        }
    }, [])
    return (
    <div>
        <nav>
            <Link to="/">Home</Link>
            <Link to="/posts">Posts</Link>
        </nav>
        <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route path="/posts" element={<Posts posts={posts}/>} />
        </Routes>
    </div>
    );
};

export default App;