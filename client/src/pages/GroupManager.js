import { useState, useEffect } from "react";

import { ListPlayers } from "../components/groupManager";

const GroupManager = () => {
  const [players, setPlayers] = useState(null);
  const [group, setGroup] = useState(null);
  return (
    <>
      <ListPlayers />
    </>
  );
};

export default GroupManager;
