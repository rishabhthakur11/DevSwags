const user = require("../../models/user.schema");
const asyncHandler = require("../../services/asyncHandler");
const CustomError = require("../../utils/customError");
const cookieOptions = require("../../utils/cookieOptions.js");

/*************************************************************
 * @logout Post request
 * @route http://localhost:4000/api/auth/logout
 * @description User Logout controller for Exiting the Application
 * @parameters
 * @return success Message
 **************************************************************/

const logout = asyncHandler(async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});
module.exports = logout;
