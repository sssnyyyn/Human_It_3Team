const express = require('express');
const router = express.Router();
const chatbotController = require('../controllers/chatbotController');
const authMiddleware = require('../utils/authMiddleware');

router.post('/message', authMiddleware, chatbotController.sendMessage);
router.get('/history', authMiddleware, chatbotController.getHistory);

module.exports = router;
