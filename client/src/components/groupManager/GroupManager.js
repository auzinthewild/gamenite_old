import { useContext } from "react";
import {
  GroupHeader,
  ListGroupPlayers,
  ListGroupGames,
  ListGroupEvents,
} from ".";
import { PlayerContext } from "../../App";

const GroupManager = () => {
  const { playerInfo } = useContext(PlayerContext);

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
        <GroupHeader />
        <ListGroupPlayers />
        <ListGroupGames />
        <ListGroupEvents />
      </div>
    </>
  );
};

export default GroupManager;
