const express = require("express");
const pool = require("../db");
const router = express.Router();
const passport = require("passport");
const jwtRequired = passport.authenticate("jwt", { session: false });

// create a player
router.post("/", jwtRequired, async (req, res) => {
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
router.get("/", jwtRequired, async (req, res) => {
  try {
    const allPlayers = await pool.query("SELECT * FROM players");
    res.json(allPlayers.rows);
  } catch (error) {
    console.error(error.message);
  }
});

router.get("/:player_id", jwtRequired, async (req, res) => {
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

router.get("/email/:player_email", jwtRequired, async (req, res) => {
  try {
    console.log(req.params);
    const { player_email } = req.params;
    const singlePlayer = await pool.query(
      "SELECT * FROM players WHERE player_email = $1",
      [player_email]
    );
    console.log(`YEP ${singlePlayer.rows[0]}`);
    res.json(singlePlayer.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

// get a single player by their email
// router.get("/email/:player_email", jwtRequired, async (req, res) => {
//   try {
//     console.log(req.params);
//     const { player_email } = req.params;
//     const singlePlayer = await pool.query(
//       "SELECT * FROM players WHERE player_email = $1",
//       [player_email]
//     );
//     res.json(singlePlayer.rows[0]);
//   } catch (error) {
//     console.error(error.message);
//   }
// });

// get a single player's group IDs and group names from their player id
router.get("/group/:player_id", jwtRequired, async (req, res) => {
  try {
    console.log(req.params);
    const { player_id } = req.params;
    const playerGroup = await pool.query(
      'SELECT group_players.group_id, "game-group".group_name FROM group_players LEFT JOIN "game-group" ON group_players.group_id = "game-group".group_id WHERE group_players.player_id = $1',
      [player_id]
    );
    res.json(playerGroup.rows);
  } catch (error) {
    console.error(error.message);
  }
});

// update a player
router.put("/:player_id", jwtRequired, async (req, res) => {
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
router.delete("/:player_id", jwtRequired, async (req, res) => {
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
