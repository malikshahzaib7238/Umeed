const mongoose = require("mongoose");

const instance = new mongoose.Schema(
  {

    username: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["female", "male", "other", "prefer-not-to-say"],
      default:"male"
    },
    age: {
      type: Number,
      min: 18,
      max: 100,
      default:18
    },
    location: {
      type: String,
      default:"Pakistan"
    },
    description: {
      type: String,
      maxlength: 500,
      default: "An Umeed user"
    },
    skills: [
      {
        type: String,
      },
    ],
    mentorAvailable: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const modelName = "Account";

module.exports = mongoose.model(modelName, instance);
