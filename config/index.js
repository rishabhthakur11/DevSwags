require("dotenv").config();


const config = {
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRY: process.env.JWT_EXPIRY || "30h",
  MONGO_URI: process.env.MONGO_URI,
  PORT: process.env.PORT
};

module.exports = config;
