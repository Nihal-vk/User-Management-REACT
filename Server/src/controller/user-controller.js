const User = require("../modal/userSchema");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const jwtKey = process.env.JWT_KEY;


//signup
const signUp = async (req, res) => {
  try {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
      if (err) {
        res.status(500).send({ result: "Something went wrong" });
      }
      res.send({ result, auth: token });
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ result: "Failed to sign up" });
  }
};


const login = async (req, res) => {
    try {
      if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select("-password");
        if (user) {
          jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
            if (err) {
              console.error(err);
              res.status(500).send({ result: "Something went wrong" });
            } else {
              res.send({ user, auth: token });
            }
          });
        } else {
          res.status(404).send({ result: "User not found" });
        }
      } else {
        res.status(400).send({ result: "Missing credentials" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ result: "Internal server error" });
    }
  };
  

module.exports = { signUp, login };
