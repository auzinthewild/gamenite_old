const express = require("express");
const pool = require("../db");
const passport = require("passport");
const { sendMail, acceptInvite } = require("../invitePlayer");
const router = express.Router();
const jwtRequired = passport.authenticate("jwt", { session: false });

// create a group
router.post("/", jwtRequired, async (req, res) => {
  try {
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
    const { group_id } = req.params;
    const { game_id } = req.body;
    console.log;
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
router.delete("/:group_id/games/:game_id", jwtRequired, async (req, res) => {
  try {
    console.log(req.params);
    const { group_id, game_id } = req.params;
    // const { game_id } = req.body;
    console.log(group_id, game_id);
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
router.post(
  "/:group_id/invite/:player_email",
  jwtRequired,
  async (req, res) => {
    try {
      console.log("CHEESE");
      console.log(JSON.stringify(req.body));
      const { playerEmail, groupID, groupName } = req.body;
      // console.log(player_email, group_id, group_name);
      sendMail(playerEmail, groupID, groupName);
      res.end();
    } catch (error) {
      console.error(error.message);
    }
  }
);

// return all pending group invites
router.get("/:group_id/invites", jwtRequired, async (req, res) => {
  try {
    const { group_id } = req.params;
    const playerInvites = await pool.query(
      `SELECT group_invites.join_key, group_invites.group_id, group_invites.player_email FROM group_invites WHERE group_invites.group_id = $1`,
      [group_id]
    );
    res.json(playerInvites.rows);
  } catch (error) {
    console.log("boo!");
    console.error(error.message);
  }
});

router.get("/:group_id/join", async (req, res) => {
  try {
    const { group_id } = req.params;
    const { player_email, join_key } = req.query;
    console.log(JSON.stringify(req.params), JSON.stringify(req.query));
    const playerKeyMatch = await pool
      .query(
        `SELECT group_invites.join_key, group_invites.group_id, group_invites.player_email, "game-group".group_name FROM group_invites LEFT JOIN "game-group" on group_invites.group_id = "game-group".group_id WHERE player_email = $1 AND group_invites.group_id = $2 and join_key = $3`,
        [player_email, group_id, join_key]
      )
      .then((data) => {
        console.log(`PLAYER KEY MATCH ${JSON.stringify(data)}`);
        if (!data.rows[0]) {
          console.log("no match");
        } else {
          const groupName = data.rows[0].group_name;
          acceptInvite(player_email, group_id, join_key).then(() => {
            res.redirect(
              `http://localhost:3000/JoinedGroup?groupName=${groupName}`
            );
          });
        }
      });
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = router;
