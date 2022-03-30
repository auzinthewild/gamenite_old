const express = require("express");
const pool = require("../db");
const router = express.Router();

// create a group
router.post("/", async (req, res) => {
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
router.get("/", async (req, res) => {
  try {
    const allGroups = await pool.query('SELECT * FROM "game-group"');
    res.json(allGroups.rows);
  } catch (error) {
    console.error(error.message);
  }
});

// get a single group
router.get("/:group_id", async (req, res) => {
  try {
    console.log(req.params);
    const { group_id } = req.params;
    const singleGroup = await pool.query(
      'SELECT * FROM "game-group" WHERE group_id = $1',
      [group_id]
    );
    res.json(singleGroup.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

// update a group
router.put("/:group_id", async (req, res) => {
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
router.delete("/:group_id", async (req, res) => {
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

module.exports = router;
