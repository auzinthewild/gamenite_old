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

// search BGG API for games
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

    const gameListXML = gameListData.data;
    console.log(gameListXML);

    let searchResults = [];

    parseString(gameListXML, (err, result) => {
      console.log(result.items);
      if (result.items["$"]["total"] === "0") {
        res.json(JSON.stringify(searchResults));
      }

      const items = result.items.item;

      console.log(items);

      for (let i = 0; i < items.length; i++) {
        console.log(items[i]["name"][0]["$"].value);
        console.log(items[i]["$"].id);
        searchResults.push({
          gameID: items[i]["$"].id,
          gameName: items[i]["name"][0]["$"].value,
        });
      }
      console.log(searchResults);
    });

    res.json(JSON.stringify(searchResults));
  } catch (error) {
    console.error(error.message);
  }
});

// get game data from  BGG API
router.get("/search/game", async (req, res) => {
  console.log("hi");
  try {
    const queryString = req.query.query;
    console.log(queryString);
    const config = {
      headers: { "Content-Type": "text/xml" },
    };
    const gameDataRaw = await axios.get(
      `https://boardgamegeek.com/xmlapi2/thing?type=boardgame,boardgameexpansion&id=${queryString}`,
      config
    );
    // console.log(gameListXML.data);
    const gameDataXML = gameDataRaw.data;

    let gameDataArr = [];
    parseString(gameDataXML, (err, result) => {
      const items = result.items.item;
      // console.log(items.length);
      for (let i = 0; i < items.length; i++) {
        // console.log(items[i]);
        let gameData = {
          gameID: null,
          gameName: "",
          gameDesc: "",
          gameMinPlaytime: null,
          gameMaxPlaytime: null,
          gameMinPlayers: null,
          gameMaxPlayers: null,
        };
        gameData.gameID = Number(items[i]["$"]["id"]);
        gameData.gameName = items[i]["name"][0]["$"]["value"];
        gameData.gameDesc = items[i]["description"][0];
        gameData.gameMinPlaytime = Number(
          items[i]["minplaytime"][0]["$"]["value"]
        );
        gameData.gameMaxPlaytime = Number(
          items[i]["maxplaytime"][0]["$"]["value"]
        );
        gameData.gameMinPlayers = Number(
          items[i]["minplayers"][0]["$"]["value"]
        );
        gameData.gameMaxPlayers = Number(
          items[i]["maxplayers"][0]["$"]["value"]
        );
        // console.log(gameData);
        gameDataArr.push(gameData);
      }
    });
    console.log(gameDataArr);
    res.json(gameDataArr);
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = router;
