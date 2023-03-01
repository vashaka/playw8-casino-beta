const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const prizeOwnerSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
      unique: false,
    },
    // nft: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Nft",
    //   required: false,
    // },
    prize: {
      type: Array,
    },
  },
  { timestamps: true }
);

const prizeOwnerModel = mongoose.model("PrizeOwner", prizeOwnerSchema);
module.exports = prizeOwnerModel;
