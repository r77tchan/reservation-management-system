const express = require('express')
const notificationsController = require('../controllers/notificationsController')
const authenticateToken = require('../middleware/authMiddleware')
const router = express.Router()

// 通知追加
router.post('/send', authenticateToken, notificationsController.send)

module.exports = router
