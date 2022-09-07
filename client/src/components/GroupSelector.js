import React, { Fragment, useContext } from "react";
import Button from "react-bootstrap/Button";
import { PlayerContext } from "../App";
import { getGroupInfo } from "../GroupInfo";

function GroupSelector() {
  const { playerInfo, setPlayerGroupInfo, setCurrentGroupInfo } =
    useContext(PlayerContext);
  return (
    <Fragment>
      <div className="container">
        <h1>Select Group</h1>
        {playerInfo.playerGroupIDs.map((groupID) => (
          <div key={groupID["id"]}>
            <Button
              onClick={() => {
                setPlayerGroupInfo((currGroupInfo) => ({
                  ...currGroupInfo,
                  selectedGroup: groupID["id"],
                }));
                getGroupInfo({ id: groupID["id"], name: groupID["name"] }).then(
                  (data) => {
                    setCurrentGroupInfo(data);
                  }
                );
              }}
            >
              {groupID["name"]}
            </Button>
          </div>
        ))}
      </div>
    </Fragment>
  );
}

export default GroupSelector;
