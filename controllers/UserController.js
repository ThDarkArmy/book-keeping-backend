import User from "../model/User";
import MailSender from "../utils/MailSender";
import { randomBytes } from "crypto";
import createError from "http-errors";


// get logged in user
export const getLoggedInUser = async (req, res, next) => {
  try {
    const user = req.user;
    res.status(200).json({
      success: true,
      message: "Logged in User",
      body: user,
    });
  } catch (err) {
    next(err);
  }
};



// user registration
export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email: email });

    if (user && user.isVerified)
      throw createError.BadRequest("User with given email already exists.");
    else await User.deleteMany({ email: user.email });

    await new User({
      name,
      email,
      password,
      verificationCode: randomBytes(20).toString("hex"),
    }).save();

    // sending mail to verify the account
    let verificationUrl = BASE_URL + "/users/verify/" + user.verificationCode;
    let html =
      `<div><h2>Please click on the Verify Email to verify your email.</h2></br>` +
      `<a href=${verificationUrl}>Verify Email</a> </div>`;
    const mailSender = new MailSender(email, "User account verification", html);

    await mailSender.sendMail();

    res.status(201).json({
      success: true,
      message:
        "Account successfully created, please check your mail to verify your account.",
    });
  } catch (err) {
    next(err);
  }
};


// verify user account
export const verifyAccount = async (req, res, next) => {
  try {
    let user = await User.findOne({
      verificationCode: req.params.verificationCode,
    });

    if (!user) throw createError.BadRequest("Invalid verification Code");

    user.verified = true;
    user.verificationCode = undefined;
    await user.save();

    res.status(201).json({
      success: true,
      message: "User verified, now you can loggin",
    });
  } catch (err) {
    next(err);
  }
};


// User login
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email: email });

    if (!user) throw createError.BadRequest("Invalid Credentials");
    if (!user.verified)
      throw createError.BadRequest("User is yet to be verified.");
    if (!(await user.comparePassword(password)))
      throw createError("Invalid Credentials");

    const token = await user.generateJwt();

    res.status(200).json({
      success: true,
      message: "Logged in Successfully",
      token: `Bearer ${token}`,
      body: user.getUserInfo(),
    });
  } catch (err) {
    next(err);
  }
};


// Update account 
export const updateAccount = async (req, res, next) => {
  try {
    const { name } = req.body;
    let user = await User.findById(req.user._id);
    user.name = name;
    await user.save();

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      body: user.getUserInfo(),
    });
  } catch (err) {
    next(err);
  }
};


// delete account
export const deleteAccount = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.user._id);

    res.status(200).json({
      success: true,
      message: "User account deleted successfully.",
    });
  } catch (err) {
    next(err);
  }
};
