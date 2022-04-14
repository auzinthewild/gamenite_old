import "./App.css";
import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";

// COMPONENTS
import { InputGame, ListGames } from "./components/gameManager";
import { GroupManager } from "./pages";
import { Home, Profile, Loading } from "./routes";

function App() {
  const [auth, setAuth] = useState(null); // IF WE CHANGE THIS INITIAL VALUE WE GET DIFFERENT PAGES

  useEffect(() => {
    axios.get("/auth/current-session").then(({ data }) => {
      setAuth(data);
    });
  }, []);
  console.log(auth);
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
          <GroupManager auth={auth} />
        </div>
      </Fragment>
    );
  }
  return <Home />;
}
// <Fragment>
//   <div className="container">
//     <InputGame />
//     <ListGames />
//     <ListPlayers />
//     <GroupManager />

//   </div>
// </Fragment>

export default App;
