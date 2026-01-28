const { Router } = require('express');
const router = Router();
const { requireAuth } = require('../middleware/authMiddleware');
const budgetController = require('../controller/budgetController');

// Post request -  to add a budget
router.post('/budgets', requireAuth, budgetController.createBudget);

// Get request  - to get all the budgets
router.get('/budgets', requireAuth, budgetController.getAllBudgets);

// Get request - to get the summary for a user
// budgets/summary should be written strictly above budgets/:id , otherwise , the "/summary"
// will be considered as ":id"
router.get('/budgets/summary', requireAuth, budgetController.getBudgetSummary);

// Get request - to get a budget by its id
router.get('/budgets/:id', requireAuth, budgetController.getBudgetById);

// Put request - to update a budget by id
router.put('/budgets/:id', requireAuth, budgetController.updateBudget);

// Delete request - to delete a budget by id
router.delete('/budgets/:id', requireAuth, budgetController.deleteBudget);

module.exports = router;