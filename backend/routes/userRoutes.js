import express from "express";
const userRouter = express.Router();
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  getUserById,
  getUserPostsById,
} from "../controllers/userControllers.js";
import { protect } from "../middlewares/authMiddleware.js";

userRouter.route("/").post(registerUser).get(getUsers);
userRouter.post("/login", authUser);
userRouter
  .route("/profile")
  .get(getUserProfile)
  .put(protect, updateUserProfile);
userRouter.route("/:id/posts").get(getUserPostsById);
userRouter.route("/:id").get(getUserById);

export default userRouter;
