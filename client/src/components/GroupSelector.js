import React, { Fragment, useContext } from "react";
import Button from "react-bootstrap/Button";
import { PlayerContext } from "../App";

function GroupSelector(groupID) {
  const { playerInfo, setCurrentGroup } = useContext(PlayerContext);

  return (
    <Fragment>
      <div className="container">
        <h1>Select Group</h1>
        {playerInfo.playerGroupIDs.map((groupID) => (
          <div key={groupID}>
            <Button onClick={() => setCurrentGroup([groupID[0], groupID[1]])}>
              {groupID[1]}
            </Button>
          </div>
        ))}
      </div>
    </Fragment>
  );
}

export default GroupSelector;
