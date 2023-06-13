const express = require("express");
const router = express.Router();
const User = require("../Db/User");



router.post("/login", (req, res) => {
  if (req.body.username == "admin@gmail.com" && req.body.password == "12345") {
    const adminData = {
      admin: true,
      username: "admin",
    };
    res.send(adminData);
  } else {
    res.send({ err: "invalid credintials" });
  }
});

router.post("/adduser", async (req, res) => {
  let user = new User(req.body);
  let result = await user.save();
  res.send(result);
});

router.get("/getUser", async (req, res) => {
  const users = await User.find();
  if (users.length > 0) {
    res.send(users);
  } else {
    res.send({ result: "No user Found" });
  }
});

router.delete("/user/:id", async (req, res) => {
  let result = await User.deleteOne({ _id: req.params.id });
  res.send(result);
});

router.get("/user/:id", async (req, res) => {
  try {
    let result = await User.findOne({ _id: req.params.id });
    if (result) {
      res.send(result);
    } else {
      res.send({ res: "no records" });
    }
  } catch (error) {
    console.log(error);
    res.send({ res: "no records" });
  }
});

router.put("/user/:id", async (req, res) => {
  let result = await User.updateOne({ _id: req.params.id }, { $set: req.body });
  res.send(result);
});

router.get("/search/:key", async (req, res) => {
  try {
    let result = await User.find({
      $or: [
        {
          name: { $regex: req.params.key },
        },
        {
          email: { $regex: req.params.key },
        },
      ],
    });
    res.send(result);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
