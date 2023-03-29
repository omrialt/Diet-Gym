import mongoose from "mongoose";
import bcrypt from "bcrypt";
import Joi from "joi";

const userSchema = mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      minLength: 2,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      minLength: 2,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
      minLength: 8,
    },
    shareMyPhone: {
      type: Boolean,
      required: false,
      default: false,
    },
    profileImage: {
      type: String,
      required: false,
    },
    totalUploads: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
});

export function validateUser(user) {
  const schema = Joi.object({
    fullname: Joi.string().min(2).required(),
    email: Joi.string().min(2).required().email(),
    password: Joi.string().min(6).required(),
    phoneNumber: Joi.string().min(8).required(),
    shareMyPhone: Joi.boolean(),
    profileImage: Joi.string(),
    totalUploads: Joi.number().default(0),
  });
  return schema.validate(user);
}

export function validateAuth(user) {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(user);
}

const User = mongoose.model("User", userSchema);

export default User;
