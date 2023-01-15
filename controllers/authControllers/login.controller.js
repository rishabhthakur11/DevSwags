const user = require("../../models/user.schema");
const asyncHandler = require("../../services/asyncHandler");
const CustomError = require("../../utils/customError");
const cookieOptions = require("../../utils/cookieOptions.js");

/*************************************************************
 * @login Post request 
 * @route http://localhost:4000/api/auth/login
 * @description User Login controller for Entering the Home Page
 * @parameters email , Password
 * @return User Object
 **************************************************************/

const login = asyncHandler(async (req, res) => {
  // login controller
  const { email, password } = req.body;
  // sanitize the email and password

  if (!(email && password)) {
    throw new CustomError("Please enter email and password", 400);
  }
  const ExistedUser = await user.findOne({ email }).select("+password");
  if (!ExistedUser) {
    throw new CustomError("User not Exist or Invalid Credentials", 400);
  }
  const isPasswordMatched = await ExistedUser.comparePassword(password);
  if (isPasswordMatched) {
    const token = ExistedUser.getJwtToken();
    ExistedUser.password = undefined;
    res.cookie("token", token, cookieOptions);
    return res.status(200).json({
      success: true,
      token,
      ExistedUser,
    });
  }
  throw new CustomError("Invalid crendentials", 400);
});

module.exports = login;

