import mongoose from "mongoose";
import Joi from "joi";

const reviewsSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
      minLength: 3,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);
const exerciseSchema = mongoose.Schema({
  name: {
    type: String,
    minLength: 2,
    required: true,
  },
  muscleName: {
    type: String,
    minLength: 2,
    required: true,
  },
  sets: {
    type: Number,
    required: true,
    min: 1,
  },
  reps: {
    type: Number,
    required: true,
    min: 2,
  },
});
const likesSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
});
const trainingSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: 3,
    },
    user: {
      type: String,
    },
    buildBy: {
      type: String,
      required: true,
      minLength: 3,
    },
    type: {
      type: String,
      required: true,
      minLength: 3,
    },
    description: {
      type: String,
      required: true,
      minLength: 30,
    },
    image: {
      type: String,
      required: false,
    },
    likesByUser: { type: Array },
    likesCount: { type: Number, default: 0 },
    reviews: [reviewsSchema],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },

    exercise: [exerciseSchema],
  },
  { timestamps: true }
);

export function validateTraining(training) {
  const schema = Joi.object({
    title: Joi.string().min(3).required(),
    buildBy: Joi.string().min(3).required(),
    user: Joi.string(),
    image: Joi.string().min(3).required(),
    type: Joi.string().min(3).required(),
    description: Joi.string().min(30).required(),
    likesCount: Joi.number().default(0),
    exercise: Joi.array(),
    rating: Joi.number(),
  });
  return schema.validate(training);
}
export function validateReview(review) {
  const schema = Joi.object({
    name: Joi.string().required(),
    rating: Joi.number().required(),
    comment: Joi.string().min(3).required(),
  });
  return schema.validate(review);
}
export function validateExercise(exercise) {
  const schema = Joi.object({
    name: Joi.string().required(),
    muscleName: Joi.string().required(),
    sets: Joi.number().required(),
    reps: Joi.number().required(),
  });
  return schema.validate(exercise);
}

const Training = mongoose.model("Training", trainingSchema);
export default Training;
