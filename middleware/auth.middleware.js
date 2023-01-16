const user = require("../models/user.schema");
const JWT = require("jsonwebtoken");
const asyncHandler = require("../services/asyncHandler");
const CustomError = require("../utils/customError");
const config = require("../config/index");

const auth = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.cookie.token ||
    (req.header.autherization && req.headers.authorization.startsWith("Bearer"))
  ) {
    token = req.cookies.token || req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    throw new CustomError("Not Authorized to access", 401);
  }
  try {
    const decodeJwtPayload = JWT.verify(token, config.JWT_SECRET);
    req.user = await User.findById(decodeJwtPayload._id, "name email role");
    next();
  } catch (error) {
    throw new CustomError("Not Authorized to access", 401);
  }
});

module.exports = auth;
