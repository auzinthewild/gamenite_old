import React, { Fragment, useContext } from "react";

import Table from "react-bootstrap/Table";
import { AddEventModal } from ".";
import { PlayerContext } from "../../App";

const ListGroupEvents = () => {
  const { currentGroupInfo } = useContext(PlayerContext);

  return (
    <Fragment>
      <div className="section-container">
        <h2 className="header-title">Upcoming Events</h2>
        <Table striped>
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
      </div>
    </Fragment>
  );
};

export default ListGroupEvents;
