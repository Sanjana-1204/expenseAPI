const budgetDao = require('../dao/budgetDao');

const createBudget = async ({ category, month, limit, userId }) => {
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


    // const budget = await budgetDao.createBudget({ user: userId, category: body.category, month: body.month, limit: body.limit });
    // if (!budget) {
    //     throw new Error("Budget not created")
    // }
    // return budget;

}

const getAllBudgets = async () => {

}

const getBudgetById = async () => {

}

const getBudgetSummary = async () => {

}

const updateBudget = async () => {

}

const deleteBudget = async () => {

}

module.exports = {
    createBudget,
    getAllBudgets,
    getBudgetById,
    updateBudget,
    deleteBudget,
    getBudgetSummary
}

