import React, { Fragment, useEffect, useState } from "react";

const ListGroupPlayers = ({ groupID }) => {
  const [players, setPlayers] = useState([]);
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
      <h1>Group Players - </h1>
      <table>
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
          </tr>
        </thead>
        <tbody>
          {/* <tr>
            <td>Mark</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr> */}
          {players.map((player) => (
            <tr key={player.player_id}>
              <td>{player.player_name}</td>
              <td>{player.player_email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListGroupPlayers;