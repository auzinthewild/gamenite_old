const express = require("express");
const pool = require("../db");
const router = express.Router();

// create a game
router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const { game_name, game_desc, min_players, max_players, game_dur } =
      req.body;
    const newGame = await pool.query(
      "INSERT INTO games (game_name, game_desc, min_players, max_players, game_dur) VALUES($1, $2, $3, $4, $5) RETURNING *",
      [game_name, game_desc, min_players, max_players, game_dur]
    );
    res.json(newGame.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

// get all games
router.get("/", async (req, res) => {
  try {
    const allGames = await pool.query("SELECT * FROM games");
    res.json(allGames.rows);
  } catch (error) {
    console.error(error.message);
  }
});

// get a single game
router.get("/:game_id", async (req, res) => {
  try {
    console.log(req.params);
    const { game_id } = req.params;
    const singleGame = await pool.query(
      "SELECT * FROM games WHERE game_id = $1",
      [game_id]
    );
    res.json(singleGame.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

// update a game
router.put("/:game_id", async (req, res) => {
  try {
    console.log(req.params);
    console.log(req.body);
    const { game_id } = req.params;
    const { game_name, game_desc, min_players, max_players, game_dur } =
      req.body;
    const singleGame = await pool.query(
      "UPDATE games SET game_name=$2, game_desc=$3, min_players=$4, max_players=$5, game_dur=$6 WHERE game_id = $1",
      [game_id, game_name, game_desc, min_players, max_players, game_dur]
    );
    res.json(`${game_name} was updated!`);
  } catch (error) {
    console.error(error.message);
  }
});

// delete a game
router.delete("/:game_id", async (req, res) => {
  try {
    const { game_id } = req.params;
    const deleteGame = await pool.query(
      "DELETE FROM games WHERE game_id = $1",
      [game_id]
    );
    res.json(`Game was deleted!`);
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = router;
