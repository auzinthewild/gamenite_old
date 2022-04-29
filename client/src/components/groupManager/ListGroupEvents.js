import React, { Fragment, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { AddEventModal } from ".";

const ListGroupEvents = ({ groupID }) => {
  const [events, setGroupEvents] = useState([]);

  // delete player function
  const deleteGroupEvent = async (id) => {
    try {
      const deletePlayer = await fetch(`http://localhost:5000/events/${id}`, {
        method: "DELETE",
      });

      setGroupEvents(events.filter((event) => event.event_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  const getGroupEvents = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/groups/${groupID}/events`
      );
      const jsonData = await response.json();
      setGroupEvents(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getGroupEvents();
  }, [groupID]);
  return (
    <Fragment>
      <h1>Upcoming Events</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th scope="col">Event ID</th>
            <th scope="col">Date</th>
            <th scope="col">Location</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
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
