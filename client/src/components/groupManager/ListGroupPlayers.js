import React, { Fragment, useEffect, useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import InvitePlayerModal from "./InvitePlayerModal";
import { PlayerContext } from "./GroupManager";

const ListGroupPlayers = ({ groupID }) => {
  const [players, setPlayers] = useState([]);
  const { playerInfo } = useContext(PlayerContext);
  console.log(playerInfo);
  // delete player function
  const deletePlayer = async (id) => {
    try {
      const deletePlayer = await fetch(`http://localhost:5000/players/${id}`, {
        method: "DELETE",
      });

      setPlayers(players.filter((player) => player.player_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  const getPlayers = async (group_id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/groups/${group_id}/players`
      );
      const jsonData = await response.json();
      setPlayers(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getPlayers(groupID);
  }, [groupID]);

  return (
    <Fragment>
      <h1>Group Members</h1>
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
