const budgetDao = require('../dao/budgetDao');

const createBudget = async ({ body, userId }) => {
    const existingBudget = await budgetDao.findBudget({ user: userId, category: body.category });
    if (existingBudget === null) {
        const budget = await budgetDao.createBudget({ user: userId, category: body.category, month: body.month, limit: body.limit });
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

