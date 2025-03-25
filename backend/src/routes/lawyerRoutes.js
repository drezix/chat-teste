const express = require('express');
const lawyerController = require('../controllers/lawyerController');
const router = express.Router();

router.post('/register', lawyerController.register);
router.post('/login',lawyerController.login);

module.exports = router;