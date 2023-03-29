import Training, { validateTraining } from "../models/TrainingModel.js";
import { validateExercise, validateReview } from "../models/TrainingModel.js";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

//action-get all trainingProgram
//method-GET
//route-/api/training
//access-any
const getAllTrainings = asyncHandler(async (req, res) => {
  const trainings = await Training.find();
  if (trainings) {
    res.json(trainings);
  }
  if (!trainings) {
    return res.status(404).json({ message: "Trainings not found" });
  }
});

//action-get training by id
//method-GET
//route-/api/training/:id
//access-any
const getTrainingsById = asyncHandler(async (req, res) => {
  const training = await Training.findById(req.params.id);
  if (training) {
    res.json(training);
  }
  if (!training) {
    return res.status(404).json({ message: "Training not found" });
  }
});

const getTrainingsByUser = asyncHandler(async (userId) => {
  const trainings = await Training.find({ user: userId });
  if (trainings) {
    return trainings;
  }
  return [];
});

//action-delete training by id
//method-DELETE
//route-/api/training/:id
//access-protect
const deleteTraining = asyncHandler(async (req, res) => {
  const training = await Training.findById(req.params.id);
  const userId = req.user._id;
  const user = await User.findById(userId);
  if (training && training.user === userId.toString()) {
    await training.remove();
    user.totalUploads--;
    await user.save();
    res.json({ message: "Training remove" });
  } else {
    return res.status(404).json({ message: "Error occourd" });
  }
});
//action-create new training
//method-POST
//route-/api/training
//access-protect
const createTraining = asyncHandler(async (req, res) => {
  const user = await User.findById(req.body.user);
  console.log(req.body);
  const training = new Training(req.body);
  const { error } = validateTraining(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  user.totalUploads++;
  await user.save();
  const createdTraining = await training.save();
  res.status(201).json(createdTraining);
});

//action-update training by id
//method-PUT
//route-/api/training/:id
//access-protect
const updateTraining = asyncHandler(async (req, res) => {
  const body = req.body;
  delete body._id;
  const { error } = validateTraining(body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const { title, type, description, exercise, image } = req.body;
  const userId = req.user._id;
  const training = await Training.findById(req.params.id);
  if (training && training.user.toString() === userId.toString()) {
    training.title = title;
    training.type = type;
    training.description = description;
    training.exercise = exercise;
    training.image = image;
    const updatedTraining = await training.save();
    res.status(201).json(updatedTraining);
  } else {
    return res.status(404).json({ message: "Training not found" });
  }
});
//action-add new review
//method-POST
//route-/api/training/:id/reviews
//access-protect
const createTrainingReview = asyncHandler(async (req, res) => {
  const { error } = validateReview({
    name: req.user.fullname,
    rating: req.body.rating,
    comment: req.body.comment,
  });
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const { rating, comment } = req.body;
  const training = await Training.findById(req.params.id);
  if (training) {
    const review = {
      name: req.user.fullname,
      rating: +rating,
      comment,
      user: req.user._id,
    };
    training.reviews.push(review);
    training.rating =
      training.reviews.reduce((acc, item) => item.rating + acc, 0) /
      training.reviews.length;
    await training.save();
    res.status(201).json({ message: "Review Added" });
  } else {
    return res.status(400).json({ message: "Training not found" });
  }
});
//action-get training by type
//method-GET
//route-/api/training/types/:type
//access-any
const getTrainingByType = asyncHandler(async (req, res) => {
  const { type } = req.query;
  const trainings = await Training.find({ type: type });

  if (trainings) {
    res.json(trainings);
  }
  if (!trainings) {
    return res.status(404).json({ message: "Trainings not found" });
  }
});
//action-toggle like on training
//method-POST
//route-/api/training/:id/likes
//access-protect
const toggleTrainingLike = asyncHandler(async (req, res) => {
  const training = await Training.findById(req.params.id);
  if (training) {
    const { likesByUser } = training;
    const alreadyLiked = likesByUser.find(
      (like) => like.toString() === req.user._id.toString()
    );

    if (alreadyLiked) {
      const idx = likesByUser.findIndex((like) => like === req.user._id);
      likesByUser.splice(idx, 1);
      training.likesByUser = likesByUser;
      training.likesCount -= 1;
      await training.save();
    } else {
      likesByUser.push(req.user._id);
      training.likesCount += 1;
      await training.save();
    }
    res.status(201).json(training);
  } else {
    return res.status(404).json({ message: "Training not found" });
  }
});

export {
  getAllTrainings,
  getTrainingsById,
  deleteTraining,
  createTraining,
  updateTraining,
  createTrainingReview,
  getTrainingByType,
  toggleTrainingLike,
  getTrainingsByUser,
};
