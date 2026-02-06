const expenseService = require('../services/expenseService');
const asyncHandler = require('express-async-handler');
const { AppError } = require('../middleware/errorHandler.js');

const getAllExpenses = asyncHandler(async (req, res, next) => {
    const expenses = await expenseService.getAllExpenses({
        userId: req.user._id,
        filters: req.query
    });
    if (!expenses) {
        throw new AppError('Expenses could not be retrieved', 404);
    }
    res.status(200).json(expenses);
});

const createExpense = asyncHandler(async (req, res, next) => {

    const expense = await expenseService.createExpense({
        userId: req.user._id,
        ...req.body
    });
    if (!expense) {
        throw new AppError('Expense could not be created', 400);
    }
    res.status(201).json(expense);
});


const getExpenseById = asyncHandler(async (req, res, next) => {

    const expenseById = await expenseService.getExpenseById({
        id: req.params.id,
        userId: req.user._id
    });
    if (!expenseById) {
        throw new AppError('Could not find the requested expense!', 404);
    }
    res.status(200).json(expenseById);

});

const updateExpense = asyncHandler(async (req, res, next) => {

    const expense = await expenseService.updateExpense({
        id: req.params.id,
        userId: req.user._id,
        updateData: req.body
    });
    if (!expense) {
        throw new AppError('Expense could not be updated!', 404);
    }
    res.status(200).json(expense);
});


const deleteExpense = asyncHandler(async (req, res, next) => {
    const expense = await expenseService.deleteExpense({
        id: req.params.id,
        userId: req.user._id
    });
    if (!expense) {
        throw new AppError('Expense not found', 404);
    }
    res.status(200).json({
        message: "Expense deleted successfully",
        id: req.params.id
    });
});
module.exports = {
    createExpense,
    getAllExpenses,
    getExpenseById,
    updateExpense,
    deleteExpense
}