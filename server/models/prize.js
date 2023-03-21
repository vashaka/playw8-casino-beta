const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const prizeSchema = new Schema(
  {
    title: String,
    imageUrl: String,
    videoUrl: String,
    percentage: Number,
  },
  { timestamps: true }
);

const prizeModel = mongoose.model("Prize", prizeSchema);
module.exports = prizeModel;
