import React, { Fragment, useEffect, useState } from "react";
import EditGame from "./EditGame";

const ListGames = () => {
  const [games, setGames] = useState([]);

  // delete game function
  const deleteGame = async (id) => {
    try {
      console.log("FUCK");
      const deleteGame = await fetch(`http://localhost:5000/games/${id}`, {
        method: "DELETE",
      });

      setGames(games.filter((todo) => todo.game_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  const getGames = async () => {
    try {
      const response = await fetch("http://localhost:5000/games");
      const jsonData = await response.json();
      //   console.log(jsonData);
      setGames(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getGames();
  }, []);
  return (
    <Fragment>
      <table>
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Players</th>
            <th scope="col">Game Duration</th>
            <th scope="col">&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {/* <tr>
            <td>Mark</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr> */}
          {games.map((game) => (
            <tr key={game.game_id}>
              <td>{game.game_name}</td>
              <td>{game.game_desc}</td>
              <td>
                {game.min_players} to {game.max_players}
              </td>
              <td>{game.game_dur} hours</td>
              <td>
                <EditGame />
                <button onClick={() => deleteGame(game.game_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListGames;
