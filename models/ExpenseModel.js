const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const z = require('zod');

const expenseSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    amount: {
        type: Number,
        required: [true, "Please add an amount"],
        min: [1, "Please enter amount more than 1"]
    },
    category: {
        type: String,
        required: true,
        index: true,
        trim: true,
        enum: ['Groceries', 'Rent', 'Transportation', 'Activities', 'Shopping', 'Subscriptions', 'Essentials', 'Leisure', 'Health']

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

expenseSchema.index({ userId: 1, date: -1 });

const Expense = mongoose.model('Expense', expenseSchema);
module.exports = Expense;