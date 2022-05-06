import React, { Fragment, useContext } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { ManageGamesModal } from ".";
import { PlayerContext } from "../../App";

const ListGroupGames = () => {
  const { currentGroupInfo } = useContext(PlayerContext);

  // open the modal to manage the groups' games
  const manageGroupGames = async (group_id) => {};

  return (
    <Fragment>
      <h2>Owned Games</h2>

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
          {currentGroupInfo.groupGames.map((game) => (
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
