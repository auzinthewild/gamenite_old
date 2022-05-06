import React, { Fragment, useContext } from "react";

import Table from "react-bootstrap/Table";
import { AddEventModal } from ".";
import { PlayerContext } from "../../App";

const ListGroupEvents = () => {
  const { currentGroupInfo } = useContext(PlayerContext);

  return (
    <Fragment>
      <h2>Upcoming Events</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th scope="col">Event ID</th>
            <th scope="col">Date</th>
            <th scope="col">Location</th>
          </tr>
        </thead>
        <tbody>
          {currentGroupInfo.groupEvents.map((event) => (
            <tr key={event.event_id}>
              <td>{event.event_id}</td>
              <td>{event.event_dt}</td>
              <td>{event.event_location}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <AddEventModal />
    </Fragment>
  );
};

export default ListGroupEvents;
