const Budget = require('../models/BudgetModel');

const createBudget = async (budgetData) => {
    const newBudget = new Budget(budgetData);
    return await newBudget.save();
}

const findBudget = async (criteria) => {
    // criteria is { user: userId, category: 'Food' }
    return await Budget.findOne(criteria);
};

module.exports = {
    createBudget,
    findBudget
};