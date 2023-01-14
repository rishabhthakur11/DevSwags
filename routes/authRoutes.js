const express = require("express");
const signup = require("../controllers/authControllers/signup.controller");

const router = express.Router();

router.post("/api/auth/signup", signup);

module.exports = router;
