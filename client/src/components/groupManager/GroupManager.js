import { useState, useEffect, useContext } from "react";
import { ListGroupPlayers, ListGroupGames, ListGroupEvents } from ".";
import axios from "axios";
import { PlayerContext } from "../../App";

const GroupManager = () => {
  const [players, setPlayers] = useState(null);
  const [group, setGroup] = useState(null);
  const { playerInfo, currentGroup, csrfToken } = useContext(PlayerContext);
  console.log(`yarp ${JSON.stringify(currentGroup)}`);
  // axios.post(`/groups/1/invite/austin.bodin@gmail.com`, {
  //   playerEmail: "austin.bodin@gmail.com",
  // });

  return (
    <>
      <div>
        <p>
          Hi, {playerInfo.playerName}! You are logged in as{" "}
          {playerInfo.playerEmail} and your group ID is {currentGroup[0]}
        </p>
        <ListGroupPlayers />
        <ListGroupGames />
        <ListGroupEvents />
      </div>
    </>
  );
};

export default GroupManager;
