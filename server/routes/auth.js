const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const jwtRequired = passport.authenticate("jwt", { session: false });

const router = express.Router();

router.get("/private-route", jwtRequired, (req, res) => {
  return res.send("This is a private route");
});

router.get(
  "/login",
  passport.authenticate("auth0", {
    scope: "openid email profile",
  }),
  (req, res) => {
    console.log("login hit");
    res.redirect("/");
  }
);

router.get("/current-session", (req, res) => {
  console.log(`yoo ${JSON.stringify(req.session.jwt)}`);
  passport.authenticate("jwt", { session: false }, (err, user) => {
    console.log(`err ${err} user ${JSON.stringify(user)}`);
    if (err || !user) {
      res.send(false);
    } else {
      res.send(user);
    }
  })(req, res);
});

router.get("/callback", (req, res, next) => {
  passport.authenticate("auth0", (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect("/login");
    }
    console.log("CALLBACK SUCCESSFUL!");
    console.log(user._json.email);
    const userReturnObject = {
      given_name: user._json.given_name,
      family_name: user._json.family_name,
      email: user._json.email,
    };
    req.session.jwt = jwt.sign(userReturnObject, process.env.JWT_SECRET_KEY);
    return res.redirect("/");
  })(req, res, next);
});

module.exports = router;
