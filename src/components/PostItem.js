import React from "react";
import { Link } from "react-router-dom";

const PostItem = ({ post }) => {
    return (
        <div className="ui card">
            <div className="content">
                <div className="centered aligned header">
                    {post.title}
                </div>
                <div className="center aligned description">
                    <p>{post.description}</p>
                    <p>{post.price}</p>
                </div>
                <div className="extra-content">
                    <div className="center aligned header">
                        <Link to="">View Location</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostItem