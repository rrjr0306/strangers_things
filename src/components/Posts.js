import React, { useState, useEffect } from "react";
import PostItem from "./PostItem";
import { deletePost } from "../api/api";
import { Link } from "react-router-dom";

import "./Posts.css";

const Posts = ({ posts, setPosts, token }) => {
  //map over posts here!
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPosts, setFilteredPosts] = useState(posts);

  useEffect(() => {
    if (searchTerm) {
      const searchTerms = searchTerm
        .toLowerCase()
        .trim()
        .split(" ");
      const filtered = posts.filter((postsObject) => {
        const filterValues = [
          postsObject.title,
          postsObject.description,
          postsObject.location,
          postsObject.price,
        ];

        for (let value of filterValues) {
          const valueLower = value.toLowerCase().trim();

          for (let term of searchTerms) {
            if (
              valueLower.length > 0 &&
              term.length > 0 &&
              valueLower.includes(term)
            ) {
              return true;
            }
          }
        }

        return false;
      });

      // const filtered = posts.filter((postObject) => {
      //     // console.log('postObject', postObject)

      //     if (postObject.description === searchTerm) {
      //         return true;
      //     }

      //     return false;
      // });
      setFilteredPosts(filtered);
      console.log("filtered!!!", filteredPosts);
    } else {
      setFilteredPosts(posts);
      console.log("not filtered!!!!", filteredPosts);
    }
  }, [searchTerm, posts]);

  const handleDeleteClick = async (postId) => {
    await deletePost(token, postId);
    setPosts((prevPost) => prevPost.filter((post) => post._id !== postId));
  };

  return (
    <>
    <div class="button-search">
      <div class="ui icon input">
        <input
          style={{fontFamily: 'itc-benguiat, serif'}}
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <i className="search icon"></i>
      </div>
      <Link to="/posts/create" className="ui button" style={{fontFamily: 'itc-benguiat, serif'}}>
        Post Item
      </Link>
    </div>

      <div className="posts-container">
        {filteredPosts.map((post) => {
          return (
            <PostItem key={post._id} post={post}>
              {post.isAuthor ? (
                <div className="right floated aligned header">
                  <span>Mine</span>
                </div>
              ) : (
                <div></div>
              )}
              {post.isAuthor ? (
                <button
                  style={{fontFamily: 'itc-benguiat, serif'}}
                  className="negative ui button left floated"
                  onClick={() => handleDeleteClick(post._id)}
                >
                  Delete
                </button>
              ) : (
                <div></div>
              )}
            </PostItem>
          );
        })}
      </div>
    </>
  );
};

export default Posts;
