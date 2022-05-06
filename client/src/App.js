import "./App.css";
import axios from "axios";
import Button from "react-bootstrap/Button";
import React, { Fragment, useEffect, useState, createContext } from "react";
import { getGroupInfo } from "./GroupInfo";
import { getPlayerInfo } from "./PlayerInfo";
import LoopCircleLoading from "./components/LoopCircleLoading";

// COMPONENTS
import { GroupManager } from "./components/groupManager";
import GroupSelector from "./components/GroupSelector";
import { Home, Loading } from "./routes";

export const PlayerContext = createContext();

function App() {
  const [auth, setAuth] = useState(null); // IF WE CHANGE THIS INITIAL VALUE WE GET DIFFERENT PAGES
  const [currentGroup, setCurrentGroup] = useState([]);
  const [playerInfo, setPlayerInfo] = useState({
    playerID: null,
    playerName: "",
    playerEmail: "",
    playerGroupIDs: null,
  });
  const [currentGroupInfo, setCurrentGroupInfo] = useState({
    groupID: null,
    groupName: "",
    groupPlayers: [],
    groupGames: [],
    groupEvents: [],
  });
  const [csrfToken, setCsrfToken] = useState("");

  useEffect(() => {
    axios.get("/auth/current-session").then(({ data }) => {
      setAuth(data);
    });
  }, []);

  useEffect(() => {
    console.log(`auth info ${JSON.stringify(auth)}`);
    if (auth) {
      axios
        .get("/auth/get-token")
        .then(({ data }) => {
          console.log(`meep ${JSON.stringify(data)}`);
          setCsrfToken(data.csrfToken);
          axios.defaults.headers.post["X-CSRF-Token"] = data.csrfToken;
        })
        .then(
          getPlayerInfo(auth.email).then((data) => {
            console.log("info");
            console.log(data);
            setPlayerInfo(data);
          })
        );
    }
  }, [auth]);

  useEffect(() => {
    if (playerInfo.playerGroupIDs) {
      if (
        playerInfo.playerGroupIDs.length === 1 &&
        playerInfo.playerGroupIDs[0] !== 0
      ) {
        setCurrentGroup(playerInfo.playerGroupIDs[0]);
      } else if (playerInfo.playerGroupIDs.length > 1) {
        setCurrentGroup([-1, -1]);
      } else if (
        playerInfo.playerGroupIDs.length === 0 &&
        playerInfo.playerGroupIDs[0] === 0
      ) {
        setCurrentGroup([0, 0]);
      }

      console.log(`group length ${playerInfo.playerGroupIDs.length}`);
    }
  }, [playerInfo]);

  useEffect(() => {
    if (currentGroup && currentGroup[0] > 0) {
      getGroupInfo(currentGroup).then((data) => {
        setCurrentGroupInfo(data);
      });
    }
  }, [currentGroup]);

  if (auth === null) {
    return <LoopCircleLoading />;
  }

  if (auth && currentGroup.length === 0) {
    return (
      <div>
        <LoopCircleLoading />
      </div>
    );
  }
  if (auth && currentGroup[0] > 0 && currentGroupInfo.groupID != null) {
    return (
      <Fragment>
        <div className="container">
          <PlayerContext.Provider
            value={{ playerInfo, currentGroup, currentGroupInfo }}
          >
            <GroupManager />
          </PlayerContext.Provider>{" "}
        </div>
      </Fragment>
    );
  } else if (auth && currentGroup[0] !== -1 && currentGroup[0] !== 0) {
    return (
      <div>
        <LoopCircleLoading />
      </div>
    );
  }

  if (auth && currentGroup[0] === -1) {
    return (
      <Fragment>
        <PlayerContext.Provider
          value={{
            playerInfo,
            setCurrentGroup,
            currentGroupInfo,
            setCurrentGroupInfo,
          }}
        >
          <GroupSelector />
        </PlayerContext.Provider>
      </Fragment>
    );
  } else if (auth && currentGroup[0] === 0) {
    return (
      <Fragment>
        <div className="container">
          <h1>Zero groups</h1>
        </div>
      </Fragment>
    );
  }
  return <Home />;
}

export default App;
