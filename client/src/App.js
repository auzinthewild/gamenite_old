import "./App.css";
import axios from "axios";
import React, { Fragment, useEffect, useState, createContext } from "react";
import { getPlayerInfo } from "./PlayerInfo";
import LoopCircleLoading from "./components/LoopCircleLoading";
import { Routes, Route } from "react-router-dom";

// ROUTES
import { GamesManager } from "./routes/GamesManager";

// COMPONENTS
import { GroupManager } from "./components/groupManager";
import GroupSelector from "./components/GroupSelector";
import { Home, Header } from "./components";
import { getGroupInfo } from "./GroupInfo";

export const PlayerContext = createContext();

function App() {
  const [auth, setAuth] = useState(null);

  const [playerInfo, setPlayerInfo] = useState({
    playerID: null,
    playerName: "",
    playerEmail: "",
    playerGroupIDs: [],
  });
  const [playerGroupInfo, setPlayerGroupInfo] = useState({
    selectedGroup: null,
    multipleGroups: false,
    hasGroups: false,
    groupIDs: [],
  });
  const [currentGroupInfo, setCurrentGroupInfo] = useState({
    groupID: null,
    groupName: "",
    groupPlayers: [],
    groupGames: [],
    groupEvents: [],
  });

  const [csrfToken, setCsrfToken] = useState("");
  console.log(csrfToken);
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
          axios.defaults.headers.delete["X-CSRF-Token"] = data.csrfToken;
          axios.defaults.headers.put["X-CSRF-Token"] = data.csrfToken;
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
      if (playerInfo.playerGroupIDs.length === 1) {
        console.log("length 1");
        getGroupInfo({
          id: playerInfo.playerGroupIDs[0]["id"],
          name: playerInfo.playerGroupIDs[0]["name"],
        }).then((data) => {
          setCurrentGroupInfo(data);
        });
        setPlayerGroupInfo({
          selectedGroup: playerInfo.playerGroupIDs[0]["id"],
          multipleGroups: false,
          hasGroups: true,
          groupIDs: [
            {
              id: playerInfo.playerGroupIDs[0]["id"],
              name: playerInfo.playerGroupIDs[0]["name"],
            },
          ],
        });
      } else {
        const groupArr = [];
        playerInfo.playerGroupIDs.forEach((group) => {
          groupArr.push({
            id: group["id"],
            name: group["name"],
          });
        });
        setPlayerGroupInfo({
          selectedGroup: null,
          multipleGroups: true,
          hasGroups: true,
          groupIDs: groupArr,
        });
      }
    }
  }, [playerInfo]);

  // useEffect(() => {
  //   if (currentGroup && currentGroup[0] > 0) {
  //     getGroupInfo(currentGroup).then((data) => {
  //       console.log(data);
  //       setCurrentGroupInfo(data);
  //     });
  //   }
  // }, [currentGroup]);

  //  (auth && currentGroup[0] !== -1 && currentGroup[0] !== 0)

  if (
    auth === null ||
    (auth && playerGroupInfo.groupIDs.length === 0) ||
    (auth && playerGroupInfo.selectedGroup && !currentGroupInfo.groupID)
  ) {
    console.log("fail");
    console.log(
      auth,
      playerGroupInfo.groupIDs.length,
      playerGroupInfo.selectedGroup,
      currentGroupInfo.groupID
    );
    return <LoopCircleLoading />;
  } else if (
    auth &&
    playerGroupInfo.selectedGroup &&
    currentGroupInfo.groupID
  ) {
    sessionStorage.setItem("currentGroupName", currentGroupInfo.groupName);
    sessionStorage.setItem("currentGroupId", currentGroupInfo.groupID);
    return (
      <Fragment>
        <PlayerContext.Provider
          value={{
            playerInfo,
            currentGroupInfo,
            setCurrentGroupInfo,
          }}
        >
          <Header />
          <Routes>
            <Route path="/" element={<GroupManager />} />
            <Route path="gamesManager" element={<GamesManager />} />
          </Routes>
        </PlayerContext.Provider>
      </Fragment>
    );
  } else if (
    auth &&
    playerGroupInfo.multipleGroups === true &&
    playerGroupInfo.selectedGroup === null
  ) {
    return (
      <Fragment>
        <PlayerContext.Provider
          value={{
            playerInfo,
            setPlayerGroupInfo,
            setCurrentGroupInfo,
          }}
        >
          <GroupSelector />
        </PlayerContext.Provider>
      </Fragment>
    );
  } else if (auth && playerGroupInfo.hasGroups === false) {
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
