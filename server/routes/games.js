const express = require("express");
const axios = require("axios");
const pool = require("../db");
const router = express.Router();
const passport = require("passport");
const jwtRequired = passport.authenticate("jwt", { session: false });
const parseString = require("xml2js").parseString;

// create a game
router.post("/", (req, res) => {
  passport.authenticate("jwt", { session: false }, async (err, user) => {
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
  })(req, res);
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
// router.get("/:game_id", (req, res) => {
//   passport.authenticate("jwt", { session: false }, async (err, user) => {
//     try {
//       console.log(req.params);
//       const { game_id } = req.params;
//       const singleGame = await pool.query(
//         "SELECT * FROM games WHERE game_id = $1",
//         [game_id]
//       );
//       res.json(singleGame.rows[0]);
//     } catch (error) {
//       console.error(error.message);
//     }
//   })(req, res);
// });

// update a game
router.put("/:game_id", (req, res) => {
  passport.authenticate("jwt", { session: false }, async (err, user) => {
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
  })(req, res);
});

// delete a game
router.delete("/:game_id", (req, res) => {
  passport.authenticate("jwt", { session: false }, async (err, user) => {
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
  })(req, res);
});

router.get("/search", async (req, res) => {
  console.log("hi");
  try {
    const queryString = req.query.query;
    const config = {
      headers: { "Content-Type": "text/xml" },
    };
    const gameListData = await axios.get(
      `https://boardgamegeek.com/xmlapi2/search?type=boardgame&query=${queryString}`,
      config
    );
    // console.log(gameListXML.data);
    const gameListXML = gameListData.data;
    // console.log(gameListXML);
    // const items = gameListXML.getElementsByTagName("item");
    // for (var i = 0; i < items.length; i++) {
    //   const itemId = items[i].id;
    //   console.log(itemId);
    // }
    let gameIDs = [];
    parseString(gameListXML, (err, result) => {
      console.log(result.items.item[1]["$"].id);
      const items = result.items.item;

      for (let i = 0; i < items.length; i++) {
        console.log(items[i]["$"].id);
        gameIDs.push(items[i]["$"].id);
      }
      console.log(gameIDs);
    });

    res.json(`Search results displayed!`);
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = router;
