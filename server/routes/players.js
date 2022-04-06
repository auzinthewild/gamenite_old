const express = require("express");
const pool = require("../db");
const router = express.Router();

// create a player
router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const { player_name, player_email } = req.body;
    const newPlayer = await pool.query(
      "INSERT INTO players (player_name, player_email) VALUES($1, $2) RETURNING *",
      [player_name, player_email]
    );
    res.json(newPlayer.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

// get all players
router.get("/", async (req, res) => {
  try {
    const allPlayers = await pool.query("SELECT * FROM players");
    res.json(allPlayers.rows);
  } catch (error) {
    console.error(error.message);
  }
});

// get a single player
router.get("/:player_id", async (req, res) => {
  try {
    console.log(req.params);
    const { player_id } = req.params;
    const singlePlayer = await pool.query(
      "SELECT * FROM players WHERE player_id = $1",
      [player_id]
    );
    res.json(singlePlayer.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

// update a player
router.put("/:player_id", async (req, res) => {
  try {
    console.log(req.params);
    console.log(req.body);
    const { player_id } = req.params;
    const { player_name, player_email } = req.body;
    const singlePlayer = await pool.query(
      "UPDATE players SET player_name=$2, player_email=$3 WHERE player_id = $1",
      [player_id, player_name, player_email]
    );
    res.json(`Player was updated!`);
  } catch (error) {
    console.error(error.message);
  }
});

// delete a player
router.delete("/:player_id", async (req, res) => {
  try {
    const { player_id } = req.params;
    const deleteGame = await pool.query(
      "DELETE FROM players WHERE player_id = $1",
      [player_id]
    );
    res.json(`Player was deleted!`);
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = router;
