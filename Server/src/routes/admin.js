const express = require("express");
const router = express.Router();
const adminControllers = require("../controller/admin-controller");
const { route } = require("./admin");

router.post("/login", adminControllers.authenticateAdmin);
router
  .route("/user")
  .get(adminControllers.getUsers)
  .post(adminControllers.addUser);
router
  .route("/user/:id")
  .delete(adminControllers.deleteUser)
  .get(adminControllers.getUser)
  .put(adminControllers.updateUser);
router.get("/search/:key", adminControllers.searchUsers);

module.exports = router;
