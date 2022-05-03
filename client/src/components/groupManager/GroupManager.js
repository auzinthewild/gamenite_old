import { useState, useEffect, useContext, createContext } from "react";
import { ListGroupPlayers, ListGroupGames, ListGroupEvents } from ".";

export const PlayerContext = createContext();

const GroupManager = ({ playerInfo, currentGroup }) => {
  const [players, setPlayers] = useState(null);
  const [group, setGroup] = useState(null);
  return (
    <>
      <div>
        <PlayerContext.Provider value={{ playerInfo }}>
          <p>
            Hi, {playerInfo.playerName}! You are logged in as{" "}
            {playerInfo.playerEmail} and your group ID is {currentGroup[0]}
          </p>
          <ListGroupPlayers groupID={currentGroup} />
          <ListGroupGames groupID={currentGroup[0]} />
          <ListGroupEvents groupID={currentGroup[0]} />
        </PlayerContext.Provider>
      </div>
    </>
  );
};

export default GroupManager;
