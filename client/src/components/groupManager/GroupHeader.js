import React, { useContext } from "react";
import { PlayerContext } from "../../App";
import logo from "../../images/logo.png";

function GroupHeader() {
  const { playerInfo, currentGroupInfo } = useContext(PlayerContext);
  return (
    <>
      <div className="section-nav">
        <div className="container">
          <div className="nav-container">
            <img src={logo} alt="logo" style={{ maxHeight: 25 }} />
            <div className="nav-links">
              <p>
                Hi, {playerInfo.playerName}! You are logged in as{" "}
                {playerInfo.playerEmail}.{" "}
                <a className="App-link" href={"/auth/logout"}>
                  Logout
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="section-header">
        <div className="container">
          <h1>{currentGroupInfo.groupName}</h1>
        </div>
      </div>
    </>
  );
}

export default GroupHeader;
