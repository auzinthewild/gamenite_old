import { useState, useContext } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { PlayerContext } from "../../App";

function DeleteGame({ gameID, gameName }) {
  const { currentGroupInfo } = useContext(PlayerContext);
  const groupID = currentGroupInfo["id"];
  const groupName = currentGroupInfo["name"];
  const [show, setShow] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  let responseMessage = "";
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleChange = (event) => {
    setInviteEmail(event.target.value);
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Delete
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Remove Game</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Are you sure you want to remove {gameName} from your group's
            library?
          </p>
          <form onSubmit={handleSubmit}>
            <Button type="submit" value="Submit">
              Remove
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default DeleteGame;
