import { useContext } from "react";
import { Button } from "react-bootstrap";
import { ListGroupPlayers, ListGroupGames, ListGroupEvents } from ".";
import { PlayerContext } from "../../App";
import { GroupHeader } from "../../components";
import { useNavigate } from "react-router-dom";
import InvitePlayerModal from "./InvitePlayerModal";
import { AddEventModal } from ".";

const GroupManager = () => {
  const { playerInfo } = useContext(PlayerContext);
  const navigate = useNavigate();

  return (
    <>
      <div className="container">
        <GroupHeader />
        <div className="section-container">
          <h2 className="header-title">Members</h2>
          <ListGroupPlayers />
          <InvitePlayerModal />
        </div>
        <div className="section-container">
          <h2 className="header-title">Game Library</h2>
          <ListGroupGames />
          <Button onClick={() => navigate("/gamesManager")}>
            Games Manager
          </Button>
        </div>
        <div className="section-container">
          <h2 className="header-title">Upcoming Events</h2>
          <ListGroupEvents />
          <AddEventModal />
        </div>
      </div>
    </>
  );
};

export default GroupManager;
