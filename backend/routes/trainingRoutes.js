import express from "express";
const trainingRouter = express.Router();
import {
  getAllTrainings,
  getTrainingsById,
  deleteTraining,
  createTraining,
  updateTraining,
  createTrainingReview,
  getTrainingByType,
  toggleTrainingLike,
} from "../controllers/TrainingController.js";
import { protect } from "../middlewares/authMiddleware.js";

trainingRouter.route("/").get(getAllTrainings).post(protect, createTraining);
trainingRouter.route("/:id/reviews").post(protect, createTrainingReview);
trainingRouter.route("/:id/likes").post(protect, toggleTrainingLike);
trainingRouter.route("/types/:type").get(getTrainingByType);

trainingRouter
  .route("/:id")
  .get(getTrainingsById)
  .delete(protect, deleteTraining)
  .put(protect, updateTraining);

export default trainingRouter;
