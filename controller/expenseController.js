const expenseService = require('../services/expenseService');

const getAllExpenses = async (req, res, next) => {

    try {
        const expenses = await expenseService.getAllExpenses({
            userId: req.user._id,
            filters: req.query
        });
        res.status(200).json(expenses);
    } catch (err) {
        next(err)
    }
}

// to create an expense 
const createExpense = async (req, res, next) => {
    try {
        const expense = await expenseService.createExpense({
            userId: req.user._id,
            ...req.body
        });
        res.status(201).json(expense);

    } catch (err) {
        next(err);
    }
}
const getExpenseById = async (req, res, next) => {

    try {
        const expenseById = await expenseService.getExpenseById({
            id: req.params.id,
            userId: req.user._id
        });
        res.status(200).json(expenseById);
    } catch (err) {
        next(err);
    }

}

const updateExpense = async (req, res, next) => {
    try {
        const expense = await expenseService.updateExpense({
            id: req.params.id,
            userId: req.user._id,
            updateData: req.body
        });
        res.status(200).json(expense);
    } catch (err) {
        next(err);
    }
}


const deleteExpense = async (req, res, next) => {
    try {
        const expense = await expenseService.deleteExpense({
            id: req.params.id,
            userId: req.user._id
        });
        res.status(200).json(expense);
    } catch (err) {
        next(err);
    }
}
module.exports = {
    createExpense,
    getAllExpenses,
    getExpenseById,
    updateExpense,
    deleteExpense
}