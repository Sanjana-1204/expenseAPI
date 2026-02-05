const { AppError } = require('../middleware/errorHandler');
const budgetService = require('../services/budgetService');

const createBudget = async (req, res, next) => {
    try {
        const budget = await budgetService.createBudget({ ...req.body, userId: req.user._id });
        // json status code for successful object creation is :201
        res.status(201).json(budget);
    } catch (err) {
        const error = new AppError(err.message, 404);
        next(error);

    }
}

const getAllBudgets = async (req, res, next) => {

    try {
        // get the filters and the id from the req.body
        const budgets = await budgetService.getAllBudgets({
            userId: req.user._id,
            filters: req.query
        })
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
        const budget = await budgetService.updateBudget({ id: req.params.id, userId: req.user._id, updateData: req.body });
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
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        endOfMonth.setHours(23, 59, 59, 999);

        const summary = await budgetService.getBudgetSummary({ userId: req.user._id, startDate: startOfMonth, endDate: endOfMonth });


        res.status(200).json({
            "Budget Summary: ": summary
        });
    } catch (err) {
        next(err);
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