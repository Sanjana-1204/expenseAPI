const { Router } = require('express');
const router = Router();
const { requireAuth } = require('../middleware/authMiddleware');
const budgetController = require('../controller/budgetController');
const budgetValidator = require('../validator/budgetValidator');
const validate = require('../middleware/validate');

// --- BUDGET ROUTES --- //
router.post('/budgets', requireAuth, validate(budgetValidator.budgetSchema), budgetController.createBudget);
router.get('/budgets', requireAuth, budgetController.getAllBudgets);
router.get('/budgets/summary', requireAuth, budgetController.getBudgetSummary);
router.get('/budgets/:id', requireAuth, budgetController.getBudgetById);
router.put('/budgets/:id', requireAuth, validate(budgetValidator.budgetSchema), budgetController.updateBudget);
router.delete('/budgets/:id', requireAuth, budgetController.deleteBudget);

module.exports = router;