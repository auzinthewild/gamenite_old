import react, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function AddEvent() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [eventDetails, setEventDetails] = useState({});

  const handleChange = (event) => {
    setInviteEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    return;
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Create Event
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <form onSubmit={handleSubmit}>
            <label>
              Email Address:
              <input type="text" value={""} onChange={handleChange} />
            </label>
            <Button type="submit" value="Submit">
              Send Invite
            </Button>
          </form>
        </Modal.Body>
        <Modal.Footer>Footer</Modal.Footer>
      </Modal>
    </>
  );
}

export default AddEvent;
