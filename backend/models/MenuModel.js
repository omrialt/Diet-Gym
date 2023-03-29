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
const foodsSchema = mongoose.Schema({
  name: {
    type: String,
    minLength: 2,
    required: true,
  },
  unit: {
    type: String,
    minLength: 1,
    required: true,
  },
  qty: {
    type: Number,
    required: true,
  },
  calories: {
    type: Number,
    required: true,
    min: 1,
  },
  protein: {
    type: Number,
    required: true,
    min: 0,
  },
  fat: {
    type: Number,
    required: true,
    min: 0,
  },
  carbohydrate: {
    type: Number,
    required: true,
    min: 0,
  },
});
const likesSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
});
const menuSchema = mongoose.Schema(
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
    totalCalories: {
      type: Number,
      required: true,
    },
    totalProtein: {
      type: Number,
      required: true,
    },
    totalCarbohydrate: {
      type: Number,
      required: true,
    },
    totalFats: {
      type: Number,
      required: true,
    },

    foods: [foodsSchema],
  },
  { timestamps: true }
);

export function validateMenu(menu) {
  const schema = Joi.object({
    title: Joi.string().min(3).required(),
    buildBy: Joi.string().min(3).required(),
    user: Joi.string(),
    image: Joi.string().min(3).required(),
    type: Joi.string(),
    description: Joi.string().min(30).required(),
    likesCount: Joi.number().default(0),
    foods: Joi.array(),
    rating: Joi.number(),
    totalCalories: Joi.number().required(),
    totalProtein: Joi.number().required(),
    totalFats: Joi.number().required(),
    totalCarbohydrate: Joi.number().required(),
  });
  return schema.validate(menu);
}
export function validateReview(review) {
  const schema = Joi.object({
    name: Joi.string().required(),
    rating: Joi.number().required(),
    comment: Joi.string().min(3).required(),
  });
  return schema.validate(review);
}
export function validateFoods(exercise) {
  const schema = Joi.object({
    name: Joi.string().required(),
    unit: Joi.string().required(),
    qty: Joi.string().required(),
    calories: Joi.number().required(),
    protein: Joi.number().required(),
    fat: Joi.number().required(),
    carbohydrate: Joi.number().required(),
  });
  return schema.validate(exercise);
}

const Menu = mongoose.model("Menu", menuSchema);
export default Menu;
