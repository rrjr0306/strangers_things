import React from "react";

const Home = ({guest}) => {
    return (
        <div>
            <h1 style={{fontFamily: 'itc-benguiat, serif'}}>Welcome to Stranger's Things</h1>
            {guest && <h3 style={{fontFamily: 'itc-benguiat, serif'}}>You are logged in as: {guest} </h3>}
        </div>
    );
};

export default Home