const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const z = require('zod');

const expenseSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    amount: {
        type: Number,
        required: [true, "Please add an amount"],
        min: [1, "Please enter amount more than 1"]
    },
    category: {
        type: String,
        required: true,
        enum: ['Groceries', 'Utilities', 'Entertainment', 'Leisure', 'Health', 'Miscellenous'],
        index: true,
        trim: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    description: {
        type: String,
        trim: true
    }
}, { timestamps: true }
);


const Expense = mongoose.model('Expense', expenseSchema);
module.exports = Expense;