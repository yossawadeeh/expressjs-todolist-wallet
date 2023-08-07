const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

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
      enum: ["income", "expense"],
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
