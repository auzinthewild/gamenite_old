import react, { useState, useContext } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { PlayerContext } from "../../App";

function InvitePlayerModal() {
  const { currentGroup, csrfToken } = useContext(PlayerContext);
  let groupID = currentGroup[0];
  const [show, setShow] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  let responseMessage = "";
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const checkValidEmail = async (playerEmail) => {
    try {
      const response = await fetch(`/players/email/${playerEmail}`);
      const jsonData = await response.json();
      const player_id = jsonData.player_id;
      return player_id;
    } catch (err) {
      //console.error(err.message);
    }
  };

  const checkNotInGroup = async (groupID, player_id) => {
    if (!player_id) {
      return 1;
    }

    try {
      const response = await fetch(`/groups/${groupID}/players`);
      const jsonData = await response.json();
      let playerIDs = [];
      jsonData.forEach((element) => {
        playerIDs.push(element.player_id);
      });
      let exists = playerIDs.includes(player_id);
      return exists ? 2 : 3;
    } catch (err) {
      console.error(err.message);
      alert(responseMessage);
    }
  };

  // const sendGroupInvite = async (groupID, player_id) => {
  //   try {
  //     const body = {};
  //     const response = await fetch("/invite", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(body),
  //     });
  //     //   console.log(response);
  //     window.location = "/";
  //   } catch (error) {
  //     console.error(error.message);
  //   }
  // };

  const handleSubmit = (event) => {
    event.preventDefault();

    checkValidEmail(inviteEmail).then((playerID) => {
      checkNotInGroup(groupID, playerID).then((data) => {
        if (data === 1) {
          responseMessage =
            "A player with that email address could not be found.";
        } else if (data === 2) {
          responseMessage = `That player is already a member of this group!`;
        } else if (data === 3) {
          axios.post(`/groups/1/invite/${inviteEmail}`, {
            playerEmail: inviteEmail,
          });
          responseMessage = `Successfully invited ${inviteEmail} to group!`;
        }
        alert(responseMessage);
      });
    });
  };

  const handleChange = (event) => {
    setInviteEmail(event.target.value);
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Invite Player
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Invite Player to Group</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Send an invitation to join your group. The user must already have a
            Gamenite account to receive your invitation.
          </p>
          <form onSubmit={handleSubmit}>
            <label>
              Email Address:
              <input type="text" value={inviteEmail} onChange={handleChange} />
            </label>
            <Button type="submit" value="Submit">
              Send Invite
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default InvitePlayerModal;
