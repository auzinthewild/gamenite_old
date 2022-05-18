import React, { Fragment, useEffect, useState, useContext } from "react";
import Table from "react-bootstrap/Table";
import InvitePlayerModal from "./InvitePlayerModal";
import { PlayerContext } from "../../App";

const ListGroupPlayers = () => {
  const { playerInfo, currentGroup, currentGroupInfo } =
    useContext(PlayerContext);

  return (
    <Fragment>
      <div className="section-container">
        <h2 className="header-title">Members</h2>
        <Table striped>
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
            </tr>
          </thead>
          <tbody>
            {currentGroupInfo.groupPlayers.map((player) => (
              <tr key={player.player_id}>
                <td>{player.player_name}</td>
                <td>{player.player_email}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <InvitePlayerModal />
      </div>
    </Fragment>
  );
};

export default ListGroupPlayers;
