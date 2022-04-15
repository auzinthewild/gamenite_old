import "./App.css";
import axios from "axios";
import React, { Fragment, useEffect, useState, useCallback } from "react";
import { getPlayerInfo } from "./PlayerInfo";

// COMPONENTS
import { InputGame, ListGames } from "./components/gameManager";
import { GroupManager } from "./pages";
import { Home, Loading } from "./routes";

function App() {
  const [auth, setAuth] = useState(null); // IF WE CHANGE THIS INITIAL VALUE WE GET DIFFERENT PAGES
  const [playerInfo, setPlayerInfo] = useState({
    playerID: null,
    playerName: "",
    playerEmail: "",
    playerGroupID: null,
  });

  const fetchPlayerInfo = useCallback((email) => {
    getPlayerInfo(email).then((data) => {
      setPlayerInfo(data);
    });
  }, []);

  useEffect(() => {
    axios.get("/auth/current-session").then(({ data }) => {
      setAuth(data);
      fetchPlayerInfo(data.email);
    });
  }, []);

  //console.log(playerInfo);

  if (auth === null) {
    return <Loading />;
  }
  if (auth) {
    return (
      <Fragment>
        <div className="container">
          {/* <InputGame />
          <ListGames />
          <ListPlayers /> */}
          <GroupManager playerInfo={playerInfo} />
        </div>
      </Fragment>
    );
  }
  return <Home />;
}

export default App;
