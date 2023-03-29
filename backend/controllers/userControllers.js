import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import { validateUser, validateAuth } from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import dotenv from "dotenv";
import { getTrainingsByUser } from "./TrainingController.js";
import { getMenusByUser } from "./MenuController.js";
dotenv.config();

//action-authenticate user
//method-POST
//route-/api/users/login
//access-any

const authUser = asyncHandler(async (req, res) => {
  const { error } = validateAuth(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      shareMyPhone: user.shareMyPhone,
      profileImage: user.profileImage,
      token: generateToken(user._id),
    });
  } else {
    return res.status(401).json({ message: "Invalid email or password" });
  }
});
//action-create new user
//method-POST
//route-/api/users
//access-any
const registerUser = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { error } = validateUser(req.body);
  if (error) {
    return res.status(400).json(error.details[0].message);
  }
  const { fullname, email, password, phoneNumber, shareMyPhone, profileImage } =
    req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "User already exist !" });
  }
  const user = await User.create({
    fullname,
    email,
    password,
    phoneNumber,
    shareMyPhone,
    profileImage,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      shareMyPhone: user.shareMyPhone,
      profileImage: user.profileImage,
      token: generateToken(user._id),
    });
  } else {
    return res.status(400).json({ message: "Invalid user data" });
  }
});

//action-get user profile
//method-GET
//route-/api/users/profile
//access-protect
const getUserProfile = asyncHandler(async (req, res) => {
  console.log(req.user);
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      shareMyPhone: user.shareMyPhone,
      profileImage: user.profileImage,
    });
  } else {
    return res.status(404).json({ message: "User not found" });
  }
});

//action-update user profile
//method-PUT
//route-/api/users/profile
//access-protect
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.fullname = req.body.fullname || user.fullname;
    user.email = req.body.email || user.email;
    user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
    user.shareMyPhone = req.body.shareMyPhone || user.shareMyPhone;
    user.profileImage = req.body.profileImage || user.profileImage;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    res.json({
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      shareMyPhone: user.shareMyPhone,
      profileImage: user.profileImage,
      token: generateToken(updatedUser._id),
    });
  } else {
    return res.status(404).json({ message: "User not found" });
  }
});

//action-get all users profile
//method-GET
//route-/api/users
//access-protect,admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

//action-get user profile by id
//method-GET
//route-/api/users/:id
//access-any
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    const programs = await getTrainingsByUser(user._id.toString());
    let userClone = user;
    userClone.posts = programs;
    res.json(user);
  } else {
    return res.status(404).json({ message: "User not found" });
  }
});
//action-get user posts by id
//method-GET
//route-/api/users/:id/posts
//access-any
const getUserPostsById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    const id = user._id.toString();
    const programs = await getTrainingsByUser(id);
    const menus = await getMenusByUser(id);
    const posts = [...programs, ...menus];
    res.json(posts);
  } else {
    return res.status(404).json({ message: "User not found" });
  }
});

export {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  getUserById,
  getUserPostsById,
};
