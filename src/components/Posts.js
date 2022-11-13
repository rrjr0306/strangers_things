import React from "react";
import PostItem from "./PostItem";
import { deletePost } from "../api/api";
import { Link } from "react-router-dom";

import "./Posts.css";

const Posts = ({ posts, setPosts, token }) => {
  //map over posts here!
  console.log("posts", posts);

  const handleDeleteClick = async (postId) => {
    await deletePost(token, postId);
    setPosts((prevPost) => prevPost.filter((post) => post._id !== postId));
  };

  return (
    <>
      <Link to="/posts/create" className="ui button">
        Post Item
      </Link>
      <div className="posts-container">
        {posts.map((post) => {
          return (
            <PostItem key={post._id} post={post}>
              {post.isAuthor ? (
                <div className="right floated aligned header">
                  <span>Mine</span>
                </div>
              ) : null}
              {post.isAuthor ? (
                <button
                  className="negative ui button left floated"
                  onClick={() => handleDeleteClick(post._id)}
                >
                  Delete
                </button>
              ) : null}
            </PostItem>
          );
        })}
      </div>
    </>
  );
};

export default Posts;
