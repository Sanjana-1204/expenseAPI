const { Router } = require('express');
const expenseController = require('../controller/expenseController');
const { requireAuth } = require('../middleware/authMiddleware');
const router = Router();


// Expense Routes - for user to deal with expenses

// Post request - to add an expense
router.post('/expenses', requireAuth, expenseController.createExpense);

// Get request - to get all expenses
router.get('/expenses', requireAuth, expenseController.getAllExpenses);

// Get request - to get an expense by an {id}
router.get('/expenses/:id', requireAuth, expenseController.getExpenseById);

// Put request - to update an expense with the help of an id
router.put('/expenses/:id', requireAuth, expenseController.updateExpense);

// Delete request - to delete an expense by its id
router.delete('/expenses/:id', requireAuth, expenseController.deleteExpense);




module.exports = router;