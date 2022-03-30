const express = require("express");
const pool = require("../db");
const router = express.Router();

// create an event
router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const { group_id, event_dt, event_location } = req.body;
    const newEvent = await pool.query(
      "INSERT INTO events (group_id, event_dt, event_location) VALUES($1, $2, $3, $4, $5) RETURNING *",
      [group_id, event_dt, event_location]
    );
    res.json(newEvent.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

// get all events
router.get("/", async (req, res) => {
  try {
    const allEvents = await pool.query("SELECT * FROM events");
    res.json(allEvents.rows);
  } catch (error) {
    console.error(error.message);
  }
});

// get a single event
router.get("/:event_id", async (req, res) => {
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

// update an event
router.put("/:event_id", async (req, res) => {
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

// delete an event
router.delete("/:event_id", async (req, res) => {
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

module.exports = router;
