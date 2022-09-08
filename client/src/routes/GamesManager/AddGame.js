import { Fragment, useState, useContext } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import { PlayerContext } from "../../App";
import LoopCircleLoading from "../../components/LoopCircleLoading";

function AddGame() {
  const { currentGroupInfo } = useContext(PlayerContext);
  const groupID = currentGroupInfo["id"];
  const groupName = currentGroupInfo["name"];
  const [show, setShow] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchFlag, setSearchFlag] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const searchForGames = async (search) => {
    setSearchResults([]);
    try {
      let response = await fetch(`/games/search?query=${search}`);
      let stringJSON = await response.json();
      let jsonData = JSON.parse(stringJSON);
      console.log(typeof jsonData);
      console.log(jsonData[0]);
      const gameIDs = jsonData.map((game) => game.gameID);
      if (gameIDs.length === 0) {
        setSearchResults([
          {
            gameName: "No results found",
          },
        ]);
      } else {
        console.log(gameIDs);
        let gamesInfo = [];
        let gameCommaList = "";
        gameIDs.forEach((gameID) => {
          gameCommaList += `${gameID},`;
        });
        response = await fetch(`/games/search/game?query=${gameCommaList}`);
        const gameData = await response.json();
        console.log(gameData);
        gamesInfo.push(gameData);
        // console.log(gamesInfo);
        setSearchFlag(false);
        setSearchResults(gameData);
        console.log(searchFlag);
      }
    } catch (error) {
      console.error(`error searching for BGG games - ${error}`);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(searchFlag);
    setSearchFlag(true);
    searchForGames(searchTerm);
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    // searchForGames(searchTerm);
  };

  const handleAddGames = (event) => {
    event.preventDefault();
    searchForGames(searchTerm);
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Game
      </Button>

      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Search for Games</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Search the Board Game Geeks database for games.</p>
          <form onSubmit={handleSubmit}>
            <label>
              <input
                required
                default="Search"
                type="text"
                value={searchTerm}
                onChange={handleChange}
                feedback="You must type something."
                feedbackType="invalid"
              />
            </label>
            <Button type="submit" value="Submit">
              Search
            </Button>
            <Button variant="primary" onClick={handleAddGames}>
              Add Selected Game(s)
            </Button>

            {/* results */}

            {searchResults.length > 0 || searchFlag === false ? (
              <div>
                <Fragment>
                  <Table striped>
                    <thead>
                      <tr>
                        <th scope="col">Add</th>
                        <th scope="col">Name</th>

                        <th scope="col">Players</th>
                        <th scope="col">Game Duration (min)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {searchResults.map((game) => (
                        <tr key={game.gameID}>
                          <td>
                            {" "}
                            <Form.Check value="add" id={`${game.gameID}`} />
                          </td>
                          <td>{game.gameName}</td>

                          <td>
                            {game.gameMinPlayers}
                            {game.gameMinPlayers && game.gameMaxPlayers
                              ? " to "
                              : ""}
                            {game.gameMaxPlayers}
                          </td>
                          <td>
                            {game.gameMinPlaytime}
                            {game.gameMinPlaytime && game.gameMaxPlaytime
                              ? " - "
                              : ""}
                            {game.gameMaxPlaytime}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Fragment>
              </div>
            ) : (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div
                  style={{
                    height: "6rem",
                    width: "10rem",
                    position: "relative",
                  }}
                >
                  <LoopCircleLoading />
                </div>
              </div>
            )}
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AddGame;
