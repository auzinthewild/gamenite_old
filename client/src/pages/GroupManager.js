import { useState, useEffect } from "react";

import {
  ListGroupPlayers,
  ListGroupGames,
  ListGroupEvents,
} from "../components/groupManager";

const GroupManager = () => {
  const [players, setPlayers] = useState(null);
  const [group, setGroup] = useState(null);
  return (
    <>
      <div>
        <ListGroupPlayers />
        <ListGroupGames />
        <ListGroupEvents />
      </div>
    </>
  );
};

export default GroupManager;
