import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { addMessage } from "../api/api";
import PostItem from "./PostItem";

const ItemDetail = (props) => {
  const { token, posts, post } = props;
  const { postId } = useParams();
  const [ messageText, setMessageText ] = useState('');
  const [ errorMessage, setErrorMessage ] = useState(null);

  console.log('messageText:', messageText)

  const singlePost = posts.find((onePost) => {
    const foundPost = onePost._id == postId;
    return foundPost;
  });

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    const { success, error, message } = await addMessage(token, postId, messageText);

    if (success) {
        setMessageText('');
        console.log("sent message successfully!")
    } else {
        setErrorMessage(error)
        console.log("failed to send message")
    }
  }

  if (!singlePost) {
    return <p>Loading...</p>;
  }

  return (
    <>
    
    <PostItem post={singlePost} />

    {!singlePost.isAuthor ? (
    <form 
        className="message-form" 
        onSubmit={handleOnSubmit}>
        <input
            style={{fontFamily: 'itc-benguiat, serif'}} 
            type="text" 
            placeholder="New Message" 
            value={messageText}
            onChange={(event) => 
                setMessageText(event.target.value)}/>
        <button style={{fontFamily: 'itc-benguiat, serif'}} type="submit">Send Message</button>
        {errorMessage ?
        <p style={{color: 'red', backgroundColor: 'pink'}}>Operation Failed: {errorMessage}</p>
        : null}
    </form>
    ) : <></>
    }
    </>
    
  ) 
  console.log('messageText:', messageText)
};

export default ItemDetail;
