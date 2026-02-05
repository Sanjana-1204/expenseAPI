const expenseDao = require('../dao/expenseDao');

const createExpense = async ({ userId, amount, category, date, description }) => {
    // 1. Data Sanitization
    // If user sends no date, default to today. 
    // If they send a string "2026-01-29", convert it to Date object.
    const expenseDate = date ? new Date(date) : new Date();

    const expense = await expenseDao.createExpense({
        userId: userId, category, amount, date: expenseDate, description
    });
    if (!expense) {
        throw new Error("Expense not created");
    }
    return expense;

}

const getAllExpenses = async ({ userId, filters }) => {
    const result = { userId: userId };

    // filtering one by one
    if (filters.category) {
        result.category = {
            $regex: new RegExp(`^${filters.category}$`, 'i')
        }
    }

    if (filters.amount) {
        result.amount = filters.amount;
    } else if (filters.minAmount || filters.maxAmount) {
        result.amount = {}; // Initialize object
        if (filters.minAmount) result.amount.$gte = Number(filters.minAmount);
        if (filters.maxAmount) result.amount.$lte = Number(filters.maxAmount);
    }

    if (filters.startDate || filters.endDate) {
        result.date = {}; // Initialize object
        if (filters.startDate) result.date.$gte = new Date(filters.startDate);
        if (filters.endDate) result.date.$lte = new Date(filters.endDate);
    }

    return await expenseDao.findAllExpenses(result);

}



const getExpenseById = async ({ id, userId }) => {
    console.log("--- SECURITY DEBUG ---");
    console.log("1. Searching for Expense ID:", id);
    console.log("2. Must belong to User ID:", userId);
    const expense = await expenseDao.findExpense({
        _id: id,
        userId: userId
    });
    if (!expense) {
        throw new Error("Expense does not exist");
    }
    return expense;
}


const updateExpense = async ({ id, userId, updateData }) => {
    delete updateData.userId;
    delete updateData._id;

    const updatedExpense = await expenseDao.updateExpense({
        _id: id, userId
    }, updateData);
    if (!updatedExpense) {
        throw new Error("Expense not found");
    }
    return updatedExpense;

}


const deleteExpense = async ({ id, userId }) => {

    const expense = await expenseDao.deleteExpense({
        _id: id, userId
    });
    if (!expense) {
        throw new Error("Expense not found");
    }
    return expense

}
module.exports = {
    createExpense,
    getAllExpenses,
    getExpenseById,
    updateExpense,
    deleteExpense
}