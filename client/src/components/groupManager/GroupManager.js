import { useState, useEffect, useContext } from "react";
import { ListGroupPlayers, ListGroupGames, ListGroupEvents } from ".";
import { PlayerContext } from "../../App";

const GroupManager = () => {
  const { playerInfo, currentGroup, csrfToken } = useContext(PlayerContext);

  return (
    <>
      <div>
        <p>
          Hi, {playerInfo.playerName}! You are logged in as{" "}
          {playerInfo.playerEmail}.{" "}
          <a className="App-link" href={"/auth/logout"}>
            Logout
          </a>
        </p>

        <ListGroupPlayers />
        <ListGroupGames />
        <ListGroupEvents />
      </div>
    </>
  );
};

export default GroupManager;
