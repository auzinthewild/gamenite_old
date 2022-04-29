import "./App.css";
import axios from "axios";
import Button from "react-bootstrap/Button";
import React, {
  Fragment,
  useEffect,
  useState,
  useCallback,
  createContext,
} from "react";
import { getPlayerInfo } from "./PlayerInfo";

// COMPONENTS
import { GroupManager } from "./components/groupManager";
import GroupSelector from "./components/GroupSelector";
import { Home, Loading } from "./routes";

export const PlayerContext = createContext();

function App() {
  const [auth, setAuth] = useState(null); // IF WE CHANGE THIS INITIAL VALUE WE GET DIFFERENT PAGES
  const [currentGroup, setCurrentGroup] = useState();
  const [playerInfo, setPlayerInfo] = useState({
    playerID: null,
    playerName: "",
    playerEmail: "",
    playerGroupIDs: [],
  });

  const fetchPlayerInfo = useCallback((email) => {
    getPlayerInfo(email).then((data) => {
      console.log("info");
      console.log(data);
      setPlayerInfo(data);
    });
  }, []);

  useEffect(() => {
    axios.get("/auth/current-session").then(({ data }) => {
      setAuth(data);

      fetchPlayerInfo(data.email);
    });
  }, []);

  useEffect(() => {
    if (playerInfo.playerGroupIDs.length === 1) {
      console.log("bi");
      setCurrentGroup(playerInfo.playerGroupIDs[0]);
    } else if (playerInfo.playerGroupIDs.length > 1) {
      setCurrentGroup(-1);
    } else if (playerInfo.playerGroupIDs.length === 0) {
      console.log("hi");
      setCurrentGroup(0);
    }
    console.log(`group length ${playerInfo.playerGroupIDs.length}`);
  }, [playerInfo]);

  if (auth === null) {
    return <Loading />;
  }

  if (auth && currentGroup !== -1 && currentGroup !== 0) {
    return (
      <Fragment>
        <PlayerContext.Provider value={(playerInfo, currentGroup)}>
          <div className="container">
            <GroupManager playerInfo={playerInfo} currentGroup={currentGroup} />
          </div>
        </PlayerContext.Provider>
      </Fragment>
    );
  } else if (auth && currentGroup === -1) {
    return (
      <Fragment>
        <PlayerContext.Provider value={{ playerInfo, setCurrentGroup }}>
          <GroupSelector />
        </PlayerContext.Provider>
      </Fragment>
    );
  } else if (auth && currentGroup === 0) {
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
