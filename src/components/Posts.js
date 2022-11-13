import React from "react";
import PostItem from "./PostItem";
import { Link } from "react-router-dom";

import './Posts.css';

const Posts = ({posts, setPosts, token }) => {
    //map over posts here!
    console.log("posts", posts)
    return (
        <>
        <Link to="/posts/create" className="ui button">Post Item</Link>
        <div className="posts-container">
            {posts.map((post) => {
                return (
                <PostItem 
                    key={post._id} 
                    post={post}
                    setPosts={setPosts}
                    token={token}
                    />);
            })}
        </div>
        </>
    ) 
};

export default Posts;