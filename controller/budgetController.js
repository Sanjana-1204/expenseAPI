// const Budget = require('../models/BudgetModel');
const budgetService = require('../services/budgetService');

const createBudget = async (req, res, next) => {
    try {
        const budget = await budgetService.createBudget({ ...req.body, userId: req.user._id });
        // json status code for successful object creation is :201
        res.status(201).json(budget);
    } catch (err) {
        next(err);

    }
}

const getAllBudgets = async (req, res, next) => {
    try {
        const budgets = await budgetService.getAllBudgets({ userId: req.user._id })
        res.status(200).json(budgets);
    } catch (err) {
        next(err);
    }
}

const getBudgetById = async (req, res, next) => {
    try {
        const budgetById = await budgetService.getBudgetById({ id: req.params.id, userId: req.user._id })
        res.status(200).json(budgetById);
    } catch (err) {
        next(err)
    }
}

const updateBudget = async (req, res, next) => {
    try {
        const budget = await budgetService.updateBudget({ id: req.params.id, ...req.body, userId: req.user._id });
        res.status(200).json(budget)
    } catch (err) {
        next(err)
    }
}

const deleteBudget = async (req, res, next) => {
    try {
        const budget = await budgetService.deleteBudget({ id: req.params.id, userId: req.user._id });
        res.status(200).json(budget);

    } catch (err) {
        next(err);
    }
}

const getBudgetSummary = async (req, res, next) => {
    try {
        const summary = await budgetService.getBudgetSummary({ userId: req.user._id });
        res.status(200).json(summary);
    } catch (err) {
        next(err)
    }
}

module.exports = {
    createBudget,
    getAllBudgets,
    getBudgetById,
    updateBudget,
    deleteBudget,
    getBudgetSummary
}