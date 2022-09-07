import React, { useContext } from "react";
import { PlayerContext } from "../App";

function GroupHeader() {
  const { playerInfo, currentGroupInfo } = useContext(PlayerContext);

  return (
    <div className="section-header">
      <div className="container">
        <h1>{currentGroupInfo.groupName}</h1>
      </div>
    </div>
  );
}

export default GroupHeader;
