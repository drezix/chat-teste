const express = require('express');
const processController = require('../controllers/processController');
const authMiddleware = require('../middlewares/authMiddleware');
const lawyerMiddleware = require('../middlewares/lawyerMiddleware');
const router = express.Router();

router.use(authMiddleware);

router.post('/insert', lawyerMiddleware, processController.insert);
router.get('/get/:id', processController.get);
router.delete('/delete/:id',lawyerMiddleware, processController.delete);

module.exports = router;