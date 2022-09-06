import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import JoinedGroup from "./routes/JoinedGroup";
import GamesManager from "./routes/GamesManager";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="JoinedGroup" element={<JoinedGroup />} />
        <Route path="/gamesManager" element={<GamesManager groupInfo />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
