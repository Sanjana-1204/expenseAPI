const budgetDao = require('../dao/budgetDao');

const createBudget = async ({ category, limit, userId }) => {
    const existingBudget = await budgetDao.findBudget({ userId, category });
    if (existingBudget) {
        throw new AppError("Budget for this category already exists", 409); // 409 Conflict
    }
    const budget = await budgetDao.createBudget({ userId, category, limit });
    if (!budget) {
        throw new AppError("Budget could not be created", 500);
    }
    return budget;
};

const getAllBudgets = async ({ userId, filters }) => {
    const result = { userId: userId };
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
        throw new AppError("Budget does not exist!", 404)
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
        if (!updatedBudget) {
            throw new AppError("Budget not found", 404)
        }
        return updatedBudget;
    } catch (err) {
        if (err.code == 11000) {
            throw new Error(`Budget with ${updateData.category} already exists`, 409);
        }
        throw err;
    }
}
const deleteBudget = async ({ id, userId }) => {
    const budget = await budgetDao.deleteBudget({
        _id: id,
        userId: userId
    })
    if (!budget) {
        throw new AppError('Budget not found or already deleted', 404);
    }
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

