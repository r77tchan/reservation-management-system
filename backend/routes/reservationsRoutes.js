const express = require('express')
const reservationsController = require('../controllers/reservationsController')
const authenticateToken = require('../middleware/authMiddleware')
const router = express.Router()

// 送信ユーザーの予約を取得
router.get('/', authenticateToken, reservationsController.list)
// 予約新規作成
router.post('/create', authenticateToken, reservationsController.create)
// 予約編集
router.put('/:id', reservationsController.update)
// 予約削除
router.delete('/:id/delete', reservationsController.delete)

module.exports = router
