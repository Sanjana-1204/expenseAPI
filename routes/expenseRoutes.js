const { Router } = require('express');
const expenseController = require('../controller/expenseController');
const { requireAuth } = require('../middleware/authMiddleware');
const router = Router();
const validate = require('../middleware/validate');
const expenseValidator = require('../validator/expenseValidator');

// --- EXPENSE ROUTES --- //
router.post('/expenses', requireAuth, validate(expenseValidator.expenseSchema), expenseController.createExpense);
router.get('/expenses', requireAuth, expenseController.getAllExpenses);
router.get('/expenses/:id', requireAuth, expenseController.getExpenseById);
router.put('/expenses/:id', requireAuth, validate(expenseValidator.expenseSchema), expenseController.updateExpense);
router.delete('/expenses/:id', requireAuth, expenseController.deleteExpense);

module.exports = router;