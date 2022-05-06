import React, { Fragment, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { ManageGamesModal } from ".";

const ListGroupGames = ({ groupID }) => {
  const [groupGames, setGroupGames] = useState([]);

  // delete game function
  const deleteGroupGame = async (id) => {
    try {
      const deleteGroupGame = await fetch(`/games/${id}`, {
        method: "DELETE",
      });

      setGroupGames(groupGames.filter((game) => game.game_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  // open the modal to manage the groups' games
  const manageGroupGames = async (group_id) => {};

  // get all the games the group owns
  const getGroupGames = async (group_id) => {
    try {
      const response = await fetch(`/groups/${group_id}/games`);
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
      <h1>Owned Games</h1>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Players</th>
            <th scope="col">Game Duration</th>
          </tr>
        </thead>
        <tbody>
          {groupGames.map((game) => (
            <tr key={game.game_id}>
              <td>{game.game_name}</td>
              <td>{game.game_desc}</td>
              <td>
                {game.min_players} to {game.max_players}
              </td>
              <td>{game.game_dur} hours</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ManageGamesModal />
    </Fragment>
  );
};

export default ListGroupGames;
