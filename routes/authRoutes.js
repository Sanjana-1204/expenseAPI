const { Router } = require('express');
const authController = require('../controller/authController');
const router = Router();


router.post('/auth/login', authController.userLogin);
router.post('/auth/signup', authController.userSignup);
router.get('/auth/logout', authController.userLogout);

module.exports = router;