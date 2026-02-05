const budgetDao = require('../dao/budgetDao');

const createBudget = async ({ category, limit, userId }) => {
    const existingBudget = await budgetDao.findBudget({ userId: userId, category: category });
    if (existingBudget === null) {
        const budget = await budgetDao.createBudget({ userId: userId, category: category, limit: limit });
        if (!budget) {
            throw new Error("Budget not created")
        }
        return budget;
    } else {
        throw new Error("Budget already exists");
    }
}

const getAllBudgets = async ({ userId, filters }) => {
    // 1. Base result (Always filter by User)
    const result = { userId: userId };
    // take the filters out and assign the category value to the result
    if (filters.category) {
        result.category = filters.category;
    }
    return await budgetDao.findAllBudgets(result);
}
const getBudgetById = async ({ id, userId }) => {
    const budget = await budgetDao.findBudget({
        _id: id,
        userId: userId
    });
    if (!budget) {
        throw new Error("Budget does not exist!")
    }
    return budget;
}


const getBudgetSummary = async ({ userId, startDate, endDate }) => {
    const summary = await budgetDao.summarizeBudget({ userId, startDate, endDate });
    return summary;
}

const updateBudget = async ({ id, userId, updateData }) => {
    try {
        const updatedBudget = await budgetDao.updateBudget({
            _id: id, userId: userId
        }, updateData);
        if (!updateBudget) {
            throw new Error("Budget not found")
        }
        return updatedBudget;
    } catch (err) {
        if (err.code == 11000) {
            throw new Error(`Budget with ${updateData.category} already exists`);
        }
        throw err;
    }
}
const deleteBudget = async ({ id, userId }) => {
    const budget = await budgetDao.deleteBudget({
        _id: id,
        userId: userId
    });

    return budget;
}



module.exports = {
    createBudget,
    getAllBudgets,
    getBudgetById,
    updateBudget,
    deleteBudget,
    getBudgetSummary
}

