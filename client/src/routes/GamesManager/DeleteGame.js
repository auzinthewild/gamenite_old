import { useState, useContext } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { PlayerContext } from "../../App";

function DeleteGame({ gameID, gameName }) {
  console.log(gameID);
  const { currentGroupInfo, setCurrentGroupInfo } = useContext(PlayerContext);
  const groupID = currentGroupInfo["groupID"];
  const groupName = currentGroupInfo["groupName"];
  console.log(groupID, groupName);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      console.log(gameID);
      axios.delete(`/groups/${groupID}/games/${gameID}`).then((data) => {
        console.log(data);
      });
      const newGamesList = currentGroupInfo.groupGames.filter(
        (game) => game.game_id !== gameID
      );
      setCurrentGroupInfo((groupInfo) => ({
        ...groupInfo,
        groupGames: newGamesList,
      }));
    } catch (error) {
      console.error(error);
    }
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
