// const Expense = require('../models/expense');
// const jwt = require('jsonwebtoken')
// expense_index - find all expenses
// expense_details - find expense by id
// to create a expense -add it
// to delete an expense by its id
// to update an expense object
const Expense = require('../models/ExpenseModel');

const expense_index = (req, res) => {
    Expense.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        })
}

// to create an expense 
const expense_create_post = (req, res) => {
    const expense = new Expense({
        ...req.body,          // Fix 1: Spread operator is 3 dots (...)
        userId: req.user._id  // Fix 2: Put userId INSIDE the object
    });
    console.log("Logged in User:", req.user);

    expense.save()
        .then((result) => {
            res.status(201).json(result);
        })
        .catch((err) => {
            // detailed error for debugging
            res.status(400).json({ error: err.message });
        });
}

module.exports = {
    expense_create_post,
    expense_index
}