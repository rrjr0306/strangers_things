import React, { useState } from "react";
import { registerUser, loginUser } from "../api/api";
import { useParams, useNavigate } from "react-router-dom";

const AccountForm = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const {action} = useParams();
  const navigate = useNavigate();
  console.log("action", action);

const onSubmitHandler =async(event) => {
    event.preventDefault();
    const authFn = action === "register" ? registerUser : loginUser;
    const { error, token, message } = await authFn(username, password);
    
    console.error(error);

    setToken(token)

    if (token) {
        navigate("/");
    }
};

const title = action === "login" ? "Log In" : "Sign Up"
  return (
    <form className="ui form" onSubmit={onSubmitHandler}>
      <h1>{title}</h1>
      <div className="field">
        <label>Username</label>
        <input
          type="text"
          value={username}
          placeholder="username"
          minLength="6"
          required
          onChange={(event) => setUsername(event.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          value={password}
          placeholder="password"
          minLength="8"
          required
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <button className="ui button" type="submit">
        {title}
      </button>
    </form>
  );
};

export default AccountForm;
