import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

//auth function for users
const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (req.headers.x_auth_token) {
    try {
      token = req.headers.x_auth_token;
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (err) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized,token failed");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("not authorized,no token");
  }
});

export { protect };
