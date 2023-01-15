const express = require("express");
const login = require("../controllers/authControllers/login.controller");
const signup = require("../controllers/authControllers/signup.controller");

const router = express.Router();

router.post("/api/auth/signup", signup);
router.post("/api/auth/login", login);

module.exports = router;
