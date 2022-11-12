import React from "react";
import PostItem from "./PostItem";

const Posts = ({posts}) => {
    //map over posts here!
    console.log("posts", posts)
    return (
        <>
        <div>
            {posts.map((post) => {
                return <PostItem key={post._id} post={post}/>
            })}
        </div>
        </>
    ) 
};

export default Posts;