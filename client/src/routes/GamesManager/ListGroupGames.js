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

            <th scope="col">Players</th>
            <th scope="col">Game Duration (min)</th>
            <th scope="col"> </th>
          </tr>
        </thead>
        <tbody>
          {currentGroupInfo.groupGames.map((game) => (
            <tr key={game.game_id}>
              <td>{game.game_name}</td>

              <td>
                {game.min_players} to {game.max_players}
              </td>
              <td>
                {game.min_playtime}
                {game.min_playtime && game.max_playtime ? " - " : ""}
                {game.max_playtime}
              </td>
              <td>
                <DeleteGame gameID={game.game_id} gameName={game.game_name} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Fragment>
  );
};

export default ListGroupGames;
