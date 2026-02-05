const Expense = require('../models/ExpenseModel');

const createExpense = async (expenseData) => {
    const newExpense = new Expense(expenseData);
    return await newExpense.save();
}

const findExpense = async (criteria) => {
    return await Expense.findOne(criteria);
}

const findAllExpenses = async (criteria) => {
    return await Expense.find(criteria).sort({ date: -1 });
    // sort({ field1: 1, field2: -1 });
}

const updateExpense = async (criteria, data) => {
    return await Expense.findOneAndUpdate(criteria, data, { new: true }, { runValidators: true });
}

const deleteExpense = async (criteria) => {
    return await Expense.findOneAndDelete(criteria);
}

module.exports = {
    createExpense,
    findAllExpenses,
    findExpense,
    updateExpense,
    deleteExpense
}