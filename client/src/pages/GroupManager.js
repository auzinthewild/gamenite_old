import { useState, useEffect } from "react";

import {
  ListGroupPlayers,
  ListGroupGames,
  ListGroupEvents,
} from "../components/groupManager";

const GroupManager = ({ auth }) => {
  const [players, setPlayers] = useState(null);
  const [group, setGroup] = useState(null);
  return (
    <>
      <div>
        <p>You are logged in as {auth && auth.email ? auth.email : null}</p>
        <ListGroupPlayers />
        <ListGroupGames />
        <ListGroupEvents />
      </div>
    </>
  );
};

export default GroupManager;
