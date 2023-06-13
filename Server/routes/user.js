const express = require("express");
const router = express.Router();
const User = require("../Db/User");
require('dotenv').config();
const jwt = require("jsonwebtoken");
const jwtKey = process.env.JWT_KEY;

function verifyToken(req, res, next) {
  console.warn(req.headers["authorization"]);
  let token = req.headers["authorization"];
  if (token) {
    token = token.split(" ")[1];
    jwt.verify(token, jwtKey, (err, valid) => {
      if (err) {
        res.status(401).send({ result: "please provide a valid token" });
      } else {
        next();
      }
    });
    console.log(token);
  } else {
    res.status(403).send({ result: "please provide a token" });
  }
}

router.post("/signUp", async (req, res) => {
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
    if (err) {
      res.send({ result: "someThing went wrong" });
    }
    res.send({ result, auth: token });
  });
});


router.post("/login", async (req, res) => {
  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
          res.send({ result: "someThing went wrong" });
        }
        res.send({ user, auth: token });
      });
    } else {
      res.send({ result: "user not found" });
    }
  } else {
    res.send({ result: "user not found" });
  }
});

module.exports = router;
