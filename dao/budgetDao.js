const Budget = require('../models/BudgetModel');
const Expense = require('../models/ExpenseModel');
const mongoose = require('mongoose');

const createBudget = async (budgetData) => {
    const newBudget = new Budget(budgetData);
    return await newBudget.save();
}

const findBudget = async (criteria) => {

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

const summarizeBudget = async ({ userId, startDate, endDate }) => {
    console.log(userId, startDate, endDate);
    const userObjectId = new mongoose.Types.ObjectId(userId);
    const summary = await Expense.aggregate([
        {
            $match: {
                userId: userObjectId,
                date: { $lte: endDate, $gte: startDate }
            }
        }, {
            $group: {
                _id: "$category",
                totalSpent: { $sum: "$amount" }
            }
        },

        {

            $lookup: {
                from: "budgets",
                let: { cat: "$_id" },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $and: [
                                    { $eq: ["$category", "$$cat"] },
                                    { $eq: ["$userId", userObjectId] }
                                ]
                            }
                        }
                    }
                ],
                as: "budgetDetails"
            }
        }, {
            $unwind: {
                path: "$budgetDetails", // Target the array from the lookup
                preserveNullAndEmptyArrays: true // Keep expenses even if no budget exists
            }
        },
        {
            $project: {
                _id: 0, // Hide the ID
                category: "$_id", // Rename _id to category for frontend
                summary: {
                    $cond: {
                        if: { $not: ["$budgetDetails"] }, // CHECK: Did we find a budget?
                        then: "Alert: No budget set for this category!", // IF NO
                        else: { // IF YES
                            $concat: [
                                // 1. The Percentage
                                { $toString: { $round: [{ $multiply: [{ $divide: ["$totalSpent", "$budgetDetails.limit"] }, 100] }, 0] } },
                                "%",
                                // 2. The Text
                                " (Rs. ",
                                { $toString: "$totalSpent" },
                                " spent out of Rs. ",
                                { $toString: "$budgetDetails.limit" }, // Ensure your Budget model uses 'amount' or 'limit' here
                                ")"
                            ]
                        }
                    }
                }
            }
        }
    ]);


    return summary;
}


module.exports = {
    createBudget,
    findBudget,
    findAllBudgets,
    updateBudget,
    deleteBudget,
    summarizeBudget
};