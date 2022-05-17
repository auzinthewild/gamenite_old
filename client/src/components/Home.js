import React from "react";
import Button from "react-bootstrap/Button";
import "../App.css";

function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <p>You are not logged in</p>
        <Button href={"/auth/login"}>Login Here</Button>
      </header>
    </div>
  );
}

export default Home;
