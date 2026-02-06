const { Router } = require('express');
const authController = require('../controller/authController');
const router = Router();
const { userSchema } = require('../validator/authValidator');
const validate = require('../middleware/validate');

router.post('/auth/login', validate(userSchema), authController.userLogin);
router.post('/auth/signup', validate(userSchema), authController.userSignup);
router.get('/auth/logout', authController.userLogout);

module.exports = router;