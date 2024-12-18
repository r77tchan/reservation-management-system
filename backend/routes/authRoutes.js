const express = require('express')
const authController = require('../controllers/authController')
const router = express.Router()

// テスト用
router.get('/', authController.home)
// ユーザー登録
router.post('/register', authController.register)

module.exports = router
