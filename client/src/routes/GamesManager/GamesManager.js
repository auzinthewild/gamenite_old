import React from "react";
import { ListGroupGames, AddGame } from "./";
import { GroupHeader } from "../../components";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

function GamesManager() {
  return (
    <>
      <div className="container">
        <GroupHeader />
        <div className="section-container">
          <h2 className="header-title">Game Library</h2>
          <ListGroupGames />
          <AddGame />
        </div>
        <Link to="/">Back</Link>
      </div>
    </>
  );
}

export default GamesManager;
