import "./App.css";
import React, { Fragment } from "react";

// COMPONENTS
import { InputGame, ListGames } from "./components/gameManager";
import { GroupManager } from "./pages";

function App() {
  return (
    <Fragment>
      <div className="container">
        {/* <InputGame />
        <ListGames />
        <ListPlayers /> */}
        <GroupManager />
      </div>
    </Fragment>
  );
}

export default App;
