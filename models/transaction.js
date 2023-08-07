const mongoose = require("mongoose"), Schema = mongoose.Schema;

const transactionSchema = mongoose.Schema({
  transactionDate: {
    type: Date,
    default: Date.now
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    require: true,
  },
  transactionDetail: {
    type: {
        type: String,
        require: true,
        enum: ['income', 'expense']
    },
    category: {
        type: String,
        require: true,
    },
    total: {
        type: Number,
        require: true,
        min: 1
    },
    note: String
  }
}, {timestamps: true});

module.exports = mongoose.model('Transaction', transactionSchema)