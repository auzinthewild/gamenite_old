import { useState, useContext } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { PlayerContext } from "../../App";

function InvitePlayerModal() {
  const { currentGroupInfo } = useContext(PlayerContext);
  const groupID = currentGroupInfo["groupID"];
  const groupName = currentGroupInfo["groupName"];
  const [show, setShow] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  let responseMessage = "";
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const checkValidEmail = async (playerEmail) => {
    try {
      const { data } = await axios.get(`/players/email/${playerEmail}`);
      console.log(data);
      const player_id = data.player_id;
      return player_id;
    } catch (err) {
      console.error(err.message);
    }
  };

  const checkNotInGroup = async (groupID, player_id, inviteEmail) => {
    console.log("check not in group");
    console.log(groupID, player_id, inviteEmail);
    if (!player_id) {
      return 1;
    }

    try {
      const response = await fetch(`/groups/${groupID}/players`);
      const jsonData = await response.json().then();
      let playerIDs = [];
      jsonData.forEach((element) => {
        playerIDs.push(element.player_id);
      });

      const alreadyInGroup = playerIDs.includes(player_id);
      return alreadyInGroup;
    } catch (err) {
      console.error(err.message);
      alert(responseMessage);
    }
  };

  const checkInvites = async (groupID, player_id, inviteEmail) => {
    try {
      const response = await fetch(`/groups/${groupID}/invites`);
      const jsonData = await response.json();

      let playerInvites = [];
      jsonData.forEach((element) => {
        playerInvites.push(element.player_email);
      });
      const alreadySentInvite = playerInvites.includes(inviteEmail);
      return alreadySentInvite;
    } catch (err) {
      console.error(err.message);
      alert(responseMessage);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    checkValidEmail(inviteEmail).then((playerID) => {
      if (!playerID) {
        responseMessage =
          "A player with that email address could not be found.";
        alert(responseMessage);
      } else {
        checkNotInGroup(groupID, playerID, inviteEmail).then((data) => {
          if (data) {
            responseMessage = `That player is already a member of this group!`;
            alert(responseMessage);
          } else {
            checkInvites(groupID, playerID, inviteEmail).then((data2) => {
              if (data2) {
                responseMessage = `That player has already been sent an invite to this group which is pending!`;
                alert(responseMessage);
              } else {
                console.log("trying");
                axios.post(`/groups/1/invite/${inviteEmail}`, {
                  playerEmail: inviteEmail,
                  groupID: groupID,
                  groupName: groupName,
                });
                responseMessage = `Successfully invited ${inviteEmail} to group!`;
                alert(responseMessage);
              }
            });
          }
        });
      }
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
