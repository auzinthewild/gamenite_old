import "./App.css";
import React, { Fragment } from "react";

// COMPONENTS

import InputGame from "./components/manager/InputGame";
import ListGames from "./components/manager/ListGames";

function App() {
  return (
    <Fragment>
      <div className="container">
        <InputGame />
        <ListGames />
      </div>
    </Fragment>
  );
}

export default App;
