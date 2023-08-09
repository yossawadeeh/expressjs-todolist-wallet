const mongoose = require("mongoose"),
  Schema = mongoose.Schema;
const { TypeTransaction } = require("../enum/enums")

const transactionSchema = mongoose.Schema(
  {
    transactionDate: {
      type: Date,
      default: Date.now,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: Object.values(TypeTransaction),
    },
    category: {
      type: String,
      required: true,
    },
    total: {
      type: Number,
      required: true,
      min: 0.1,
    },
    note: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);
