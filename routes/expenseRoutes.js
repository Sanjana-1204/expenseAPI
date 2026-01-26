const { Router } = require('express');
const expenseController = require('../controller/expenseController');
const { requireAuth } = require('../middleware/authMiddleware');
const router = Router();




router.get('/all-expenses', expenseController.expense_index);
router.post('/expenses', requireAuth, expenseController.expense_create_post);

module.exports = router;