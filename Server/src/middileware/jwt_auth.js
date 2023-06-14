const jwt = require("jsonwebtoken");
require("dotenv").config();
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


module.exports={verifyToken}