const express = require("express");
const pool = require("../db");
const passport = require("passport");
const sendMail = require("../invitePlayer");
const router = express.Router();
const jwtRequired = passport.authenticate("jwt", { session: false });

// create a group
router.post("/", jwtRequired, async (req, res) => {
  try {
    console.log(req.body);
    const { group_name } = req.body;
    const newGroup = await pool.query(
      'INSERT INTO "game-group" (group_name) VALUES($1) RETURNING *',
      [group_name]
    );
    res.json(newGroup.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

// get all groups
router.get("/", jwtRequired, async (req, res) => {
  try {
    const allGroups = await pool.query('SELECT * FROM "game-group"');
    res.json(allGroups.rows);
  } catch (error) {
    console.error(error.message);
  }
});

// get a single group
router.get("/:group_id", jwtRequired, async (req, res) => {
  try {
    console.log(req.params);
    const { group_id } = req.params;
    const singleGroup = await pool.query(
      'SELECT * FROM "game-group" WHERE group_id = $1',
      [group_id]
    );
    res.json(singleGroup.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// get all players in a group using the the group_id
router.get("/:group_id/players", jwtRequired, async (req, res) => {
  try {
    console.log(req.params);
    const { group_id } = req.params;
    const groupPlayers = await pool.query(
      'SELECT * FROM "group_players" LEFT JOIN players ON group_players.player_id = players.player_id WHERE group_id = $1',
      [group_id]
    );
    res.json(groupPlayers.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// get all games in a group using the group_id
router.get("/:group_id/games", jwtRequired, async (req, res) => {
  try {
    console.log(req.params);
    const { group_id } = req.params;
    const groupPlayers = await pool.query(
      'SELECT * FROM "group_games" LEFT JOIN games ON group_games.game_id = games.game_id WHERE group_id = $1',
      [group_id]
    );
    res.json(groupPlayers.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// add a game to the group inventory using the group_id and game_id
router.post("/:group_id/games", jwtRequired, async (req, res) => {
  try {
    console.log(req.body);
    const { group_id } = req.params;
    const { game_id } = req.body;
    const newGame = await pool.query(
      'INSERT INTO "group_games" (group_id, game_id) VALUES($1, $2) RETURNING *',
      [group_id, game_id]
    );
    res.json(newGame.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

// delete a game from the group inventory using the group_id and game_id
router.delete("/:group_id/games", jwtRequired, async (req, res) => {
  try {
    console.log(req.body);
    const { group_id } = req.params;
    const { game_id } = req.body;
    const deleteGame = await pool.query(
      'DELETE FROM "group_games" WHERE group_id = $1 AND game_id = $2',
      [group_id, game_id]
    );
    res.json(`Game was deleted!`);
  } catch (error) {
    console.error(error.message);
  }
});

// add a player to the group using the group_id and player_id
router.post("/:group_id/players", jwtRequired, async (req, res) => {
  try {
    console.log(req.body);
    const { group_id } = req.params;
    const { player_id } = req.body;
    const newPlayer = await pool.query(
      'INSERT INTO "group_players" (group_id, player_id) VALUES($1, $2) RETURNING *',
      [group_id, player_id]
    );
    res.json(newPlayer.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

// delete a player from the group roster using the group_id and player_id
router.delete("/:group_id/players", jwtRequired, async (req, res) => {
  try {
    console.log(req.body);
    const { group_id } = req.params;
    const { player_id } = req.body;
    const deletePlayer = await pool.query(
      'DELETE FROM "group_players" WHERE group_id = $1 AND player_id = $2',
      [group_id, player_id]
    );
    res.json(`Player was deleted!`);
  } catch (error) {
    console.error(error.message);
  }
});

// update a group
router.put("/:group_id", jwtRequired, async (req, res) => {
  try {
    console.log(req.params);
    console.log(req.body);
    const { group_id } = req.params;
    const { group_name } = req.body;
    const singleGroup = await pool.query(
      'UPDATE "game-group" SET game_name=$2, game_desc=$3, min_players=$4, max_players=$5, game_dur=$6 WHERE game_id = $1',
      [group_id, group_name]
    );
    res.json(`Group was updated!`);
  } catch (error) {
    console.error(error.message);
  }
});

// delete a group
router.delete("/:group_id", jwtRequired, async (req, res) => {
  try {
    const { group_id } = req.params;
    const deleteGame = await pool.query(
      'DELETE FROM "game-group" WHERE group_id = $1',
      [group_id]
    );
    res.json(`Group was deleted!`);
  } catch (error) {
    console.error(error.message);
  }
});

// get all events for a group using the group_id
router.get("/:group_id/events", jwtRequired, async (req, res) => {
  try {
    console.log(req.params);
    const { group_id } = req.params;
    const groupEvents = await pool.query(
      'SELECT * FROM "events" WHERE group_id = $1',
      [group_id]
    );
    res.json(groupEvents.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// invite a player to group based on player email
// router.post(
//   "/:group_id/invite/:player_email",
//   jwtRequired,
//   async (req, res) => {
//     try {
//       console.log(req.body);
//       const { group_id, player_email } = req.params;
//       const { player_id } = req.body;
//       const newPlayer = await pool.query(
//         'INSERT INTO "group_players" (group_id, player_id) VALUES($1, $2) RETURNING *',
//         [group_id, player_id]
//       );
//       res.json(newPlayer.rows[0]);
//     } catch (error) {
//       console.error(error.message);
//     }
//   }
// );

// invite a player to group based on player email
// router.post(
//   "/:group_id/invite/:player_email",
//   jwtRequired,
//   async (req, res) => {
//     console.log(`req ${JSON.stringify(req.headers)}`);
//     try {
//       //sendMail();
//       console.log("email sent!");
//     } catch (error) {
//       console.error(error.message);
//     }
//   }
// );

// router.post(
//   "/:group_id/invite/:player_email",

//   async (req, res) => {
//     console.log(`req ${JSON.stringify(req.headers)}`);
//     try {
//       sendMail();
//       console.log("email sent!");
//     } catch (error) {
//       console.error(error.message);
//     }
//   }
// );

module.exports = router;
