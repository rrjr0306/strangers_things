import React from "react";
import { Link } from "react-router-dom";
import { deletePost } from "../api/api";

const PostItem = ({ post, children }) => {
//   post.messages = [
//       {
//           "_id": "5e8d1fd747b6ce0017600594",
//           "content": "I really love this item.  Can I have it?",
//           "post": "5e8d1f2539e7a70017a7c965",
//           "fromUser": "5e8d1f2539e7a70017a7c961",
//           "createdAt": "2020-04-08T00:50:31.402Z",
//           "updatedAt": "2020-04-08T00:50:31.402Z",
//           "__v": 0
//       }
//   ]
    // console.log("post!!!!!!", post)
  return (
    <div className="ui card">
      <div className="content">
        <div className="centered aligned header">{post.title}</div>
        <div className="center aligned description">
          <p>{post.description}</p>
          <p>{post.price}</p>
        </div>
        <div className="extra-content">
          <div className="center aligned header">
            <Link to={`/posts/${post._id}`}>View Item</Link>
          </div>
        </div>
        <div>
        {children}
        </div>
        <div role="list" className="ui divided relaxed list" style={{ clear: 'both'}}>
          <div>
            {post.messages.map((message) => {
                    return (
                        <div key={message._id} role="listitem" className="item">
                            <span>
                                <b>{message.fromUser.username}</b>
                                <p className="content">{message.content}</p>
                            </span>

                        </div>
                    )
            })}            
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
