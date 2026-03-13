const express = require('express');
const router = express.Router();
const actionPlanController = require('../controllers/actionPlanController');
const authMiddleware = require('../utils/authMiddleware');

router.get('/current', authMiddleware, actionPlanController.getCurrentPlan);
router.patch('/:id/toggle', authMiddleware, actionPlanController.toggleComplete);

module.exports = router;
