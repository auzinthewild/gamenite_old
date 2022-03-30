const express = require("express");
const app = express();
const cors = require("cors");
const {
  gamesRoutes,
  eventsRoutes,
  groupsRoutes,
  playersRoutes,
} = require("./routes");

// MIDDLEWARE
app.use(cors());
app.use(express.json()); //req.body

// ROUTES
app.use("/games", gamesRoutes);
app.use("/events", eventsRoutes);
app.use("/groups", groupsRoutes);
app.use("/players", playersRoutes);

app.listen(5000, () => {
  console.log("Server has started on port 5000");
});
