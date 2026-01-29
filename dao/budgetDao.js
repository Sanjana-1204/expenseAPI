const Budget = require('../models/BudgetModel');

const createBudget = async (budgetData) => {
    const newBudget = new Budget(budgetData);
    return await newBudget.save();
}

const findBudget = async (criteria) => {
    // criteria is { user: userId, category: 'Food' }
    return await Budget.findOne(criteria);
};

const findAllBudgets = async (criteria) => {
    return await Budget.find(criteria);
}

const updateBudget = async (criteria, data) => {
    return await Budget.findOneAndUpdate(criteria, data, { new: true });
}
const deleteBudget = async (criteria) => {
    return await Budget.findOneAndDelete(criteria);
}

module.exports = {
    createBudget,
    findBudget,
    findAllBudgets,
    updateBudget,
    deleteBudget
};