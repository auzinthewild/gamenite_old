import { Fragment, useState, useContext } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import { PlayerContext } from "../../App";

function AddGame() {
  const { currentGroupInfo } = useContext(PlayerContext);
  const groupID = currentGroupInfo["id"];
  const groupName = currentGroupInfo["name"];
  const [show, setShow] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const searchForGames = async (search) => {
    const response = await fetch(`/games/search?query=${search}`);
    const stringJSON = await response.json();
    const jsonData = JSON.parse(stringJSON);
    console.log(typeof jsonData);
    console.log(jsonData[0]);
    setSearchResults(jsonData);
    return jsonData;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    searchForGames(searchTerm);
    return;
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Game
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Search for Games</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Search the Board Game Geeks database for games.</p>
          <form onSubmit={handleSubmit}>
            <label>
              <input
                default="Search"
                type="text"
                value={searchTerm}
                onChange={handleChange}
              />
            </label>
            <Button type="submit" value="Submit">
              Search
            </Button>
          </form>
          {/* results */}
          <div>
            <Fragment>
              <Table striped>
                <thead>
                  <tr>
                    <th scope="col">BGGID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Description</th>
                    <th scope="col">Players</th>
                    <th scope="col">Game Duration</th>
                    <th scope="col">Modify</th>
                  </tr>
                </thead>
                <tbody>
                  {searchResults.map((game) => (
                    <tr key={game.gameID}>
                      <td>{game.gameID}</td>
                      <td>{game.gameName}</td>
                      <td></td>
                      <td>to</td>
                      <td> hours</td>
                      <td></td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Fragment>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AddGame;
