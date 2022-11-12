import React from "react";

const Home = ({guest}) => {
    return (
        <>
            <h1>Welcome to Stranger's Things</h1>
            {guest && <h3>You are logged in as: {guest} </h3>}
        </>
    );
};

export default Home