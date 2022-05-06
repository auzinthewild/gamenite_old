const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.resolve(__dirname, ".env") });
const limiter = require("limiter");
const passport = require("./passport");
const app = express();
const session = require("cookie-session");
const helmet = require("helmet");
const hpp = require("hpp");
const csurf = require("csurf");
const cors = require("cors");
const {
  gamesRoutes,
  eventsRoutes,
  groupsRoutes,
  playersRoutes,
  authRoutes,
} = require("./routes");

// MIDDLEWARE

app.use(cors());
app.use(express.json()); //req.body

/* Set Security Configs */
app.use(helmet());
app.use(hpp());

/* Set Cookie Settings */
app.use(
  session({
    name: "session",
    secret: process.env.COOKIE_SECRET,
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
  })
);

app.use(passport.initialize());
app.use(csurf({ cookie: false }));
// Console log sessions
// app.use(function (req, res, next) {
//   console.log(`req session ${JSON.stringify(req.session.csrfSecret)}`);
//   next();
// });
//app.use(limiter);

// ROUTES

app.use("/auth", authRoutes);
app.use("/games", gamesRoutes);
app.use("/events", eventsRoutes);
app.use("/groups", groupsRoutes);
app.use("/players", playersRoutes);

app.listen(5000, () => {
  console.log("Server has started on port 5000");
});
