import asyncHandler from "express-async-handler";
import { Response, Request } from "express";
import UserModel from "../models/userModel";
import generateToken from "../utils/generateToken";
import { CustomRequest } from "../types/customTypes";
import { validationResult } from "express-validator/src/validation-result";
import sendmailRegisterUser from "../utils/mail/sendmailRegisterUser";

// @desc    Auth user/set token
// route    POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password }: { email: string; password: string } = req.body;

  const user = await UserModel.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    Register a new user
// route    POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    res.status(400);
    throw new Error("Validation Error");
  }

  const {
    name,
    email,
    password,
  }: { name: string; email: string; password: string } = req.body;

  const userExists = await UserModel.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await UserModel.create({
    name,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
  sendmailRegisterUser(res, user.email);
});

// @desc    Logout user
// route    POST /api/users/logout
// @access  Public
const logoutUser = asyncHandler(async (req: Request, res: Response) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({
    message: "User logged Out",
  });
});

// @desc    Get user profile
// route    GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    const user = {
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
    };
    res.status(200).json(user);
  }
);

// @desc    Update user profile
// route    POST /api/users/profile
// @access  Private
const updateuserProfile = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    const user = await UserModel.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;

      if (req.body.password) {
        user.password = req.body.password;
      }

      const updateUser = await user.save();

      res.status(200).json({
        _id: updateUser._id,
        name: updateUser.name,
        email: updateUser.email
      })
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  }
);

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateuserProfile,
};
