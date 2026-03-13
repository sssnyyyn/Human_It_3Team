const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const authMiddleware = require('../utils/authMiddleware');
const upload = require('../config/multerConfig');

router.post('/upload', authMiddleware, upload.single('reportFile'), reportController.uploadReport);
router.get('/years', authMiddleware, reportController.getYears);
router.get('/health', authMiddleware, reportController.getHealthReport);

module.exports = router;
