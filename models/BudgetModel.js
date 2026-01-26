const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const z = require('zod')

// defining 

const budgetSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Groceries', 'Utilities', 'Entertainment', 'Leisure', 'Health', 'Miscellenous'],
        trim: true
    },
    limit: {
        type: Number,
        required: true,
        min: 1

    }
}, { timestamps: true });

// Compound Index for user and category
budgetSchema.index({ userId: 1, category: 1 }, { unique: true });

const Budget = mongoose.model('Budget', budgetSchema);
module.exports = Budget;