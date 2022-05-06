import React, { Fragment, useEffect, useState, useContext } from "react";
import Table from "react-bootstrap/Table";
import InvitePlayerModal from "./InvitePlayerModal";
import { PlayerContext } from "../../App";

const ListGroupPlayers = () => {
  const [players, setPlayers] = useState([]);
  const { playerInfo, currentGroup, csrfToken } = useContext(PlayerContext);
  console.log(currentGroup[0]);
  // delete player function
  const deletePlayer = async (id) => {
    try {
      const deletePlayer = await fetch(`/players/${id}`, {
        method: "DELETE",
      });

      setPlayers(players.filter((player) => player.player_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  const getPlayers = async (group_id) => {
    try {
      const response = await fetch(`/groups/${group_id}/players`);
      const jsonData = await response.json();
      setPlayers(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getPlayers(currentGroup[0]);
  }, [currentGroup]);

  return (
    <Fragment>
      <h1>Members of {currentGroup[1]}</h1>
      <h2>{playerInfo.playerName}</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr key={player.player_id}>
              <td>{player.player_name}</td>
              <td>{player.player_email}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <InvitePlayerModal />
    </Fragment>
  );
};

export default ListGroupPlayers;
