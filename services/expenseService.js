const expenseDao = require('../dao/expenseDao'); const { AppError } = require('../middleware/errorHandler.js');

const createExpense = async ({ userId, amount, category, date, description }) => {
    const expenseDate = date ? new Date(date) : new Date();

    const expense = await expenseDao.createExpense({
        userId: userId, category, amount, date: expenseDate, description
    });
    if (!expense) {
        throw new AppError("Expense not created!", 400);
    }
    return expense;
};

const getAllExpenses = async ({ userId, filters }) => {
    const result = { userId: userId };

    if (filters.category) {
        result.category = {
            $regex: new RegExp(`^${filters.category}$`, 'i')
        }
    }
    if (filters.amount) {
        result.amount = filters.amount;
    } else if (filters.minAmount || filters.maxAmount) {
        result.amount = {};
        if (filters.minAmount) result.amount.$gte = Number(filters.minAmount);
        if (filters.maxAmount) result.amount.$lte = Number(filters.maxAmount);
    }

    if (filters.startDate || filters.endDate) {
        result.date = {};
        if (filters.startDate) result.date.$gte = new Date(filters.startDate);
        if (filters.endDate) result.date.$lte = new Date(filters.endDate);
    }

    return await expenseDao.findAllExpenses(result);

};


const getExpenseById = async ({ id, userId }) => {
    const expense = await expenseDao.findExpense({
        _id: id,
        userId: userId
    });
    if (!expense) {
        throw new AppError("Expense does not exist", 404);
    }
    return expense;
};


const updateExpense = async ({ id, userId, updateData }) => {
    delete updateData.userId;
    delete updateData._id;
    const updatedExpense = await expenseDao.updateExpense({
        _id: id, userId
    }, updateData);
    if (!updatedExpense) {
        throw new AppError("Expense not found or could not be updated1", 404);
    }
    return updatedExpense;

};


const deleteExpense = async ({ id, userId }) => {

    const expense = await expenseDao.deleteExpense({
        _id: id, userId
    });
    if (!expense) {
        throw new AppError("Expense could not be found or is already deleted!", 404);
    }
    return expense

};
module.exports = {
    createExpense,
    getAllExpenses,
    getExpenseById,
    updateExpense,
    deleteExpense
}