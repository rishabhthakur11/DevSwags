const user = require("../../models/user.schema");
const asyncHandler = require("../../services/asyncHandler");
const CustomError = require("../../utils/customError");
const cookieOptions = require("../../utils/cookieOptions.js");

/*************************************************************
 * @Signup
 * @route http://localhost:4000/api/auth/signup
 * @description User signUp controller for creating new user
 * @parameters name , email , Password
 * @return User Object
 **************************************************************/

const signup = asyncHandler(async (req, res) => {
  // signUp controller
  const { name, email, password } = req.body;
  // Sanitize and validate the entries
  if (!(name && email && password)) {
    throw new CustomError("All fields are required", 400);
  }
  // check if user existed
  const existUser = await user.findOne({ email });
  if (existUser) {
    throw new CustomError("User already existed", 400);
  }

  const newUser = await user.create({
    name,
    email,
    password,
  });
  const token = newUser.getJwtToken();
  newUser.password = undefined;

  res.cookie("token", token, cookieOptions);
  res.status(200).json({
    success: true,
    token,
    newUser,
  });
});
module.exports = signup;
