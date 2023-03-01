const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
      unique: false,

      email: {
        unique: false,
      },
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
