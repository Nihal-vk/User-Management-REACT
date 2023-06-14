const User = require("../modal/userSchema");

//adminlogin
const authenticateAdmin = (req, res) => {
  try {
    const { username, password } = req.body;

    if (username === "admin@gmail.com" && password === "12345") {
      const adminData = {
        admin: true,
        username: "admin",
      };
      res.send(adminData);
    } else {
      res.status(401).send({ error: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to authenticate admin" });
  }
};

//adduser
const addUser = async (req, res) => {
  try {
    let user = new User(req.body);
    let result = await user.save();
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to add user" });
  }
};

//getusersall
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (users.length > 0) {
      res.send(users);
    } else {
      res.send({ result: "No users found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to fetch users" });
  }
};

//deleteuser
const deleteUser = async (req, res) => {
  try {
    let result = await User.deleteOne({ _id: req.params.id });
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to delete user" });
  }
};

//getuser
const getUser = async (req, res) => {
  try {
    let result = await User.findOne({ _id: req.params.id });
    if (result) {
      res.send(result);
    } else {
      res.send({ result: "No records found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to fetch user" });
  }
};

//updateuser
const updateUser = async (req, res) => {
  try {
    let result = await User.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to update user" });
  }
};

//searchuser
const searchUsers = async (req, res) => {
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
    console.error(error);
    res.status(500).send({ error: "Failed to search users" });
  }
};

module.exports = {
  addUser,
  getUsers,
  deleteUser,
  getUser,
  updateUser,
  searchUsers,
  authenticateAdmin,
};
