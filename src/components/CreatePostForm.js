import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../api/api";

const PostCreateForm = ({ token, setPosts }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [willDeliver, setWillDeliver] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();

    return(
        <>
        <form className="ui form" onSubmit={ async (event) => {
            event.preventDefault();

            const {error, post} = await createPost(
                token,
                title,
                description,
                price,
                willDeliver
            );

            console.log('post form onSubmit', error, post);

            if(post) {
                setPosts((prevPosts) => [...prevPosts, post]);
                setDescription('');
                setTitle('');
                setPrice('');
                setWillDeliver(false);
                navigate("/posts");
            
            } else {
                setErrorMessage(error);
            }
        }}>
            <h4>Create New Item Post Here</h4>
            <div className="field">
                <label htmlFor="title">Title</label>
                <input 
                    type="text" 
                    className="field" 
                    placeholder="Title" 
                    required
                    value={title}
                    autoComplete="off"
                    onChange={(event) => setTitle(event.target.value)}
                />
                <label htmlFor="description">Description</label>
                <input 
                    type="text" 
                    className="field" 
                    placeholder="Item description" 
                    required
                    value={description}
                    autoComplete="off"
                    onChange={(event) => setDescription(event.target.value)}
                />
                <label htmlFor="price">Price</label>
                <input 
                    type="text" 
                    className="field" 
                    placeholder="Price" 
                    required
                    value={price}
                    autoComplete="off"
                    onChange={(event) => setPrice(event.target.value)}
                />
                <label>Will Deliver?</label>
                <input
                type="checkbox" 
                className="ui checkbox"
                value={willDeliver}
                onChange={() => setWillDeliver(true)}
                />
            </div>

            {errorMessage ? 
                <p className="ui negative message">{errorMessage}</p>
                : null
            }
            <button type="submit" className="ui button">Post Item</button>


        </form>
        </>
    )
};

export default PostCreateForm;