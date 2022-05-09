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
      <GroupHeader />
      <div className="container">
        <ListGroupPlayers />
        <ListGroupGames />
        <ListGroupEvents />
      </div>
    </>
  );
};

export default GroupManager;
