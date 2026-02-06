const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const budgetSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    category: {
        type: String,
        required: true,
        trim: true,
        enum: {
            values: ['Groceries', 'Rent', 'Transportation', 'Activities', 'Shopping', 'Subscriptions', 'Essentials', 'Leisure', 'Health'],
            message: '{VALUE} is not a supported category'
        }
    },
    limit: {
        type: Number,
        required: true,
        min: [1, "Budget limit must be at least 1"]

    }
}, { timestamps: true });

budgetSchema.index({ userId: 1, category: 1 }, { unique: true });

const Budget = mongoose.model('Budget', budgetSchema);
module.exports = Budget;