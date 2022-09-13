import { Fragment, useState, useContext, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import { PlayerContext } from "../../App";
import LoopCircleLoading from "../../components/LoopCircleLoading";

function AddGame() {
  const { currentGroupInfo, setCurrentGroupInfo } = useContext(PlayerContext);
  const groupID = currentGroupInfo["groupID"];
  const groupGames = currentGroupInfo["groupGames"];
  // const groupName = currentGroupInfo["name"];
  const [show, setShow] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchFlag, setSearchFlag] = useState(false);
  const [gamesToAdd, setGamesToAdd] = useState([]);
  const [checkedGames, setCheckedGames] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const searchForGames = async (search) => {
    setSearchResults([]);
    try {
      let response = await fetch(`/games/search?query=${search}`);
      let stringJSON = await response.json();
      let jsonData = JSON.parse(stringJSON);

      const gameIDs = jsonData.map((game) => game.gameID);
      if (gameIDs.length === 0) {
        setSearchResults([
          {
            gameName: "No results found",
          },
        ]);
      } else {
        let gamesInfo = [];
        let gameCommaList = "";
        gameIDs.forEach((gameID) => {
          gameCommaList += `${gameID},`;
        });
        response = await fetch(`/games/search/game?query=${gameCommaList}`);
        const gameData = await response.json();
        console.log(currentGroupInfo);
        const groupGameIDs = currentGroupInfo.groupGames.map((game) => {
          return game.game_id;
        });
        console.log(groupGameIDs);
        gameData.forEach((game, index) => {
          if (groupGameIDs.includes(game.gameID)) {
            gameData.splice(index, 1);
          }
        });
        gamesInfo.push(gameData);
        console.log(gameData);
        setSearchFlag(false);
        setSearchResults(gameData);
      }
    } catch (error) {
      console.error(`error searching for BGG games - ${error}`);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchFlag(true);
    searchForGames(searchTerm);
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleAddGames = async (event) => {
    event.preventDefault();
    const gameIDsToAdd = gamesToAdd.map((game) => {
      return game.gameID;
    });
    let gamesNotInDB = [];
    try {
      let response = await fetch(`/games`);
      let jsonResponse = await response.json();
      const masterGameList = jsonResponse.map((game) => {
        return game.game_id;
      });

      gamesToAdd.forEach((game, index) => {
        if (!masterGameList.includes(game.gameID)) {
          gamesNotInDB.push(game);
        }
      });
      console.log(gamesNotInDB);
      gamesNotInDB.forEach((game) => {
        addSingleGame(game);
      });
    } catch (error) {
      console.error(error);
    }

    let newGamesList = groupGames;
    gamesToAdd.forEach((game) => {
      console.log(game);
      newGamesList.push({
        game_id: game.gameID,
        game_name: game.gameName,
        max_players: game.gameMaxPlayers,
        min_players: game.gameMinPlayers,
        max_playtime: game.gameMaxPlaytime,
        min_playtime: game.gameMinPlaytime,
        group_id: groupID,
      });
      addGroupGameRelate(game.gameID);
    });
    console.log(newGamesList);
    setCurrentGroupInfo((groupInfo) => ({
      ...groupInfo,
      groupGames: newGamesList,
    }));
  };

  const addSingleGame = async (gameData) => {
    try {
      axios.post("/games", gameData);
    } catch (error) {
      console.error(error);
    }
  };

  const addGroupGameRelate = async (gameID) => {
    try {
      axios.post(`/groups/${groupID}/games`, { game_id: gameID });
    } catch (error) {
      console.error(error);
    }
  };

  const handleChecked = (position) => {
    console.log("checked");
    const updatedCheckedState = checkedGames.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedGames(updatedCheckedState);

    const currentCheckedGames = [];
    updatedCheckedState.forEach((currentState, index) => {
      console.log(
        `game ${index} ${currentState} ${searchResults[index].gameID}`
      );
      if (currentState === true) {
        currentCheckedGames.push({
          gameID: searchResults[index].gameID,
          gameName: searchResults[index].gameName,
          gameMinPlayers: searchResults[index].gameMinPlayers,
          gameMaxPlayers: searchResults[index].gameMaxPlayers,
          gameMinPlaytime: searchResults[index].gameMinPlaytime,
          gameMaxPlaytime: searchResults[index].gameMaxPlaytime,
        });
      }
    });
    setGamesToAdd(currentCheckedGames);
  };

  useEffect(() => {
    setCheckedGames(new Array(searchResults.length).fill(false));
  }, [searchResults]);

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
                type="text"
                value={searchTerm}
                onChange={handleChange}
                feedback="You must type something."
              />
            </label>
            <Button type="submit" value="Submit">
              Search
            </Button>
          </form>
          <form onSubmit={handleAddGames}>
            <Button variant="primary" type="submit" value="Submit">
              Add Selected
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
                      {searchResults.map((game, index) => (
                        <tr key={game.gameID}>
                          <td>
                            <Form.Check
                              onChange={() => handleChecked(index)}
                              id={`${game.gameID}`}
                              checked={checkedGames[index] || false}
                            />
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
