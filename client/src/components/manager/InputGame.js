import React, { Fragment, useState } from "react";

const InputGame = () => {
  const [game_name, setGameName] = useState("");
  const [game_desc, setGameDesc] = useState("");
  const [min_players, setMinPlayers] = useState("");
  const [max_players, setMaxPlayers] = useState("");
  const [game_dur, setGameDur] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { game_name, game_desc, min_players, max_players, game_dur };
      const response = await fetch("http://localhost:5000/games", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      //   console.log(response);
      window.location = "/";
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Fragment>
      <h1>Input Game</h1>
      <form onSubmit={onSubmitForm}>
        <input
          type="text"
          value={game_name}
          onChange={(e) => setGameName(e.target.value)}
        />
        <input
          type="text"
          value={game_desc}
          onChange={(e) => setGameDesc(e.target.value)}
        />
        <input
          type="text"
          value={min_players}
          onChange={(e) => setMinPlayers(e.target.value)}
        />
        <input
          type="text"
          value={max_players}
          onChange={(e) => setMaxPlayers(e.target.value)}
        />
        <input
          type="text"
          value={game_dur}
          onChange={(e) => setGameDur(e.target.value)}
        />
        <button>Add Game</button>
      </form>
    </Fragment>
  );
};

export default InputGame;
