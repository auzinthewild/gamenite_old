import React, { Fragment, useEffect, useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import InvitePlayerModal from "./InvitePlayerModal";
import { PlayerContext } from "./GroupManager";

const ListGroupPlayers = ({ groupID }) => {
  const [players, setPlayers] = useState([]);
  const { playerInfo } = useContext(PlayerContext);
  console.log(groupID[0]);
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
    getPlayers(groupID[0]);
  }, [groupID]);

  return (
    <Fragment>
      <h1>Members of {groupID[1]}</h1>
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
      <InvitePlayerModal groupID={groupID[0]} />
    </Fragment>
  );
};

export default ListGroupPlayers;
