import express from "express";
const menuRouter = express.Router();
import {
  getAllMenus,
  getMenuById,
  deleteMenu,
  createMenu,
  updateMenu,
  createMenuReview,
  getMenuByType,
  toggleMenuLike,
} from "../controllers/MenuController.js";
import { protect } from "../middlewares/authMiddleware.js";

menuRouter.route("/").get(getAllMenus).post(protect, createMenu);
menuRouter.route("/:id/reviews").post(protect, createMenuReview);
menuRouter.route("/:id/likes").post(protect, toggleMenuLike);
menuRouter.route("/types/:type").get(getMenuByType);

menuRouter
  .route("/:id")
  .get(getMenuById)
  .delete(protect, deleteMenu)
  .put(protect, updateMenu);

export default menuRouter;
