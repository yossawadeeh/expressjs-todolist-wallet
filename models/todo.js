const mongoose = require('mongoose'), Schema = mongoose.Schema;

const todoSchema = mongoose.Schema({
    topic: {
        type: String,
        required: true
    },
    description: String,
    isDone: {
        type: Boolean,
        default: false
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    todoDate: Date
}, {timestamps: true})

module.exports = mongoose.model('Todo', todoSchema)