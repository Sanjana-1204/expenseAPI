const budgetService = require('../services/budgetService');
const asyncHandler = require('express-async-handler');
const { AppError } = require('../middleware/errorHandler.js');


const createBudget = asyncHandler(async (req, res, next) => {
    const budget = await budgetService.createBudget({ ...req.body, userId: req.user._id });
    if (!budget) {
        throw new AppError('Budget could not be created!', 400);
    }
    res.status(201).json(budget);
});

const getAllBudgets = asyncHandler(async (req, res, next) => {
    const budgets = await budgetService.getAllBudgets({
        userId: req.user._id,
        filters: req.query
    })
    if (!budgets) {
        throw new AppError('Budgets could not be retrived!', 404);
    }
    res.status(200).json(budgets);
});

const getBudgetById = asyncHandler(async (req, res, next) => {

    const budgetById = await budgetService.getBudgetById({ id: req.params.id, userId: req.user._id })
    if (!budgetById) {
        throw new AppError('Could not find requested budget!', 404);
    }
    res.status(200).json(budgetById);

});

const updateBudget = asyncHandler(async (req, res, next) => {

    const budget = await budgetService.updateBudget({ id: req.params.id, userId: req.user._id, updateData: req.body });
    if (!budget) {
        throw new AppError('Budget could not be updated', 404);
    }
    res.status(200).json(budget)

});

const deleteBudget = asyncHandler(async (req, res, next) => {

    const budget = await budgetService.deleteBudget({ id: req.params.id, userId: req.user._id });
    if (!budget) {
        throw new AppError('Budget not found', 404)
        ;
    }
    res.status(200).json({ message: "Budget deleted successfully", id: req.params.id });


})

const getBudgetSummary = asyncHandler(async (req, res, next) => {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    endOfMonth.setHours(23, 59, 59, 999);
    const summary = await budgetService.getBudgetSummary({
        userId: req.user._id,
        startDate: startOfMonth,
        endDate: endOfMonth
    }
    );
    res.status(200).json({ summary });
});

module.exports = {
    createBudget,
    getAllBudgets,
    getBudgetById,
    updateBudget,
    deleteBudget,
    getBudgetSummary
}