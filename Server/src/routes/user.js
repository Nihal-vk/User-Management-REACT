const express = require("express");
const router = express.Router();
const userControllers = require("../controller/user-controller");

router.post("/signUp", userControllers.signUp);
router.post("/login", userControllers.login);

module.exports = router;
