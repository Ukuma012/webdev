import asyncHandler from "express-async-handler";
import { Response, Request } from "express";
import UserModel from "../models/userModel";

// @desc    Auth user/set token
// route    POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req: Request, res: Response) => {
  res.status(200).json({
    message: "Ok",
  });
});

// @desc    Register a new user
// route    POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password}: {name: string, email: string, password: string} = req.body;
  const userExists = await UserModel.findOne({email});

  if(userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await UserModel.create({
      name,
      email,
      password
  });

  if(user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Logout user
// route    POST /api/users/logout
// @access  Public
const logoutUser = asyncHandler(async (req: Request, res: Response) => {
  res.status(200).json({
    message: "successfully logged out",
  });
});

// @desc    Get user profile
// route    GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req: Request, res: Response) => {
  res.status(200).json({
    message: "Here is a user profile",
  });
});

// @desc    Update user profile
// route    POST /api/users/profile
// @access  Private
const updateuserProfile = asyncHandler(async (req: Request, res: Response) => {
  res.status(200).json({
    message: "successfully updated",
  });
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateuserProfile,
};
