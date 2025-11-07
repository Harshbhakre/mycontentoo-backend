import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Model = new Schema({
  title: {
    required: [true,"please fill the form properly"],
    type: String,
  },
  genre: {
    required: [true,"please fill the form properly"],
    type: String,
  },
  poster: {
    required: [true,"please fill the form properly"],
    type: String,
  },
  description: {
    required: [true,"please fill the form properly"],
    type: String,
  },
  type: {
    required: [true,"please fill the form properly"],
    type: String,
  },
  rating: {
    required: [true,"please fill the form properly"],
    type: Number,
  },
});

export const contentModel = mongoose.model("contentModel", Model);
