import React, { Fragment, useEffect, useState } from "react";

const ListGroupGames = ({ groupID }) => {
  const [groupGames, setGroupGames] = useState([]);

  // delete game function
  const deleteGroupGame = async (id) => {
    try {
      const deleteGroupGame = await fetch(`http://localhost:5000/games/${id}`, {
        method: "DELETE",
      });

      setGroupGames(groupGames.filter((game) => game.game_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  const getGroupGames = async (group_id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/groups/${group_id}/games`
      );
      const jsonData = await response.json();
      //   console.log(jsonData);
      setGroupGames(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getGroupGames(groupID);
  }, [groupID]);

  return (
    <Fragment>
      <h1>Group Games - </h1>
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
          {groupGames.map((game) => (
            <tr key={game.game_id}>
              <td>{game.game_name}</td>
              <td>{game.game_desc}</td>
              <td>
                {game.min_players} to {game.max_players}
              </td>
              <td>{game.game_dur} hours</td>
              <td>
                {/* <EditGame /> */}
                <button onClick={() => deleteGroupGame(game.game_id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListGroupGames;
