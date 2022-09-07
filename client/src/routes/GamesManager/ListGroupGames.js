import React, { Fragment, useContext } from "react";
import Table from "react-bootstrap/Table";
import { PlayerContext } from "../../App";
import { DeleteGame } from "./";

const ListGroupGames = () => {
  const { currentGroupInfo } = useContext(PlayerContext);

  return (
    <Fragment>
      <Table striped>
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Players</th>
            <th scope="col">Game Duration</th>
            <th scope="col">Modify</th>
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
              <td>
                <DeleteGame game_id={game.game_id} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Fragment>
  );
};

export default ListGroupGames;
