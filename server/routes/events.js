const express = require("express");
const pool = require("../db");
const router = express.Router();
const passport = require("passport");
const jwtRequired = passport.authenticate("jwt", { session: false });

// create an event
router.post("/", jwtRequired, async (req, res) => {
  try {
    console.log(req.body);
    const { group_id, event_dt, event_location } = req.body;
    const newEvent = await pool.query(
      "INSERT INTO events (group_id, event_dt, event_location) VALUES($1, $2, $3) RETURNING *",
      [group_id, event_dt, event_location]
    );
    res.json(newEvent.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

// get all events
router.get("/", jwtRequired, async (req, res) => {
  try {
    const allEvents = await pool.query("SELECT * FROM events");
    res.json(allEvents.rows);
  } catch (error) {
    console.error(error.message);
  }
});

// get a single event using event_id
router.get("/:event_id", jwtRequired, async (req, res) => {
  try {
    console.log(req.params);
    const { event_id } = req.params;
    const singleEvent = await pool.query(
      "SELECT * FROM events WHERE event_id = $1",
      [event_id]
    );
    res.json(singleEvent.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

// update an event using event_id
router.put("/:event_id", jwtRequired, async (req, res) => {
  try {
    console.log(req.params);
    console.log(req.body);
    const { event_id } = req.params;
    const { group_id, event_dt, event_location } = req.body;
    const singleEvent = await pool.query(
      "UPDATE events SET group_id=$2, event_dt=$3, event_location=$4 WHERE event_id = $1",
      [event_id, group_id, event_dt, event_location]
    );
    res.json(`Event was updated!`);
  } catch (error) {
    console.error(error.message);
  }
});

// delete an event using event_id
router.delete("/:event_id", jwtRequired, async (req, res) => {
  try {
    const { event_id } = req.params;
    const deleteEvent = await pool.query(
      "DELETE FROM events WHERE event_id = $1",
      [event_id]
    );
    res.json(`Event was deleted!`);
  } catch (error) {
    console.error(error.message);
  }
});

// get all players in an event using event_id
router.get("/:event_id/players", jwtRequired, async (req, res) => {
  try {
    console.log(req.params);
    const { event_id } = req.params;
    const eventPlayers = await pool.query(
      "SELECT * FROM event_players LEFT JOIN players ON event_players.player_id = players.player_id WHERE event_id = $1",
      [event_id]
    );
    res.json(eventPlayers.rows);
  } catch (error) {
    console.error(error.message);
  }
});

// add a player to an event using event_id and player_id
router.post("/:event_id/players", jwtRequired, async (req, res) => {
  try {
    console.log(req.body);
    const { event_id } = req.params;
    const { player_id } = req.body;
    const newPlayer = await pool.query(
      "INSERT INTO event_players (event_id, player_id) VALUES($1, $2) RETURNING *",
      [event_id, player_id]
    );
    res.json(newPlayer.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

// delete a player from an event using event_id and player_id
router.delete("/:event_id/players", jwtRequired, async (req, res) => {
  try {
    console.log(req.body);
    const { event_id } = req.params;
    const { player_id } = req.body;
    const deletePlayer = await pool.query(
      'DELETE FROM "event_players" WHERE event_id = $1 AND player_id = $2',
      [event_id, player_id]
    );
    res.json(`Player was deleted!`);
  } catch (error) {
    console.error(error.message);
  }
});

// get all games in an event using event_id
router.get("/:event_id/games", jwtRequired, async (req, res) => {
  try {
    console.log(req.params);
    const { event_id } = req.params;
    const eventGames = await pool.query(
      "SELECT * FROM event_games LEFT JOIN games ON event_games.game_id = games.game_id WHERE event_id = $1",
      [event_id]
    );
    res.json(eventGames.rows);
  } catch (error) {
    console.error(error.message);
  }
});

// add a game to an event using event_id and game_id
router.post("/:event_id/games", jwtRequired, async (req, res) => {
  try {
    console.log(req.body);
    const { event_id } = req.params;
    const { game_id } = req.body;
    const newGame = await pool.query(
      "INSERT INTO event_games (event_id, game_id) VALUES($1, $2) RETURNING *",
      [event_id, game_id]
    );
    res.json(newGame.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

// delete a player from an event using event_id and player_id
router.delete("/:event_id/games", jwtRequired, async (req, res) => {
  try {
    console.log(req.body);
    const { event_id } = req.params;
    const { game_id } = req.body;
    const deleteGame = await pool.query(
      'DELETE FROM "event_games" WHERE event_id = $1 AND game_id = $2',
      [event_id, game_id]
    );
    res.json(`Game was deleted!`);
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = router;
