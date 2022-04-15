import { useState, useEffect } from "react";

import {
  ListGroupPlayers,
  ListGroupGames,
  ListGroupEvents,
} from "../components/groupManager";

const GroupManager = ({ playerInfo }) => {
  const [players, setPlayers] = useState(null);
  const [group, setGroup] = useState(null);
  return (
    <>
      <div>
        <p>
          Hi, {playerInfo.playerName}! You are logged in as{" "}
          {playerInfo.playerEmail} and your group ID is{" "}
          {playerInfo.playerGroupID}
        </p>
        <ListGroupPlayers groupID={playerInfo.playerGroupID} />
        <ListGroupGames groupID={playerInfo.playerGroupID} />
        <ListGroupEvents groupID={playerInfo.playerGroupID} />
      </div>
    </>
  );
};

export default GroupManager;
