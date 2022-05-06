import React, { useContext } from "react";
import { PlayerContext } from "../../App";

function GroupHeader() {
  const { currentGroupInfo } = useContext(PlayerContext);
  return (
    <div>
      <h1>{currentGroupInfo.groupName}</h1>
    </div>
  );
}

export default GroupHeader;
