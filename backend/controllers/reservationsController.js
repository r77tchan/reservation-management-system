const Reservation = require('../models/Reservation')

// 送信ユーザーの予約を取得
exports.list = async (req, res) => {
  try {
    // JWTからユーザー情報を取得（middlewareでデコード済みのデータが req.user に入っていると仮定）
    const userId = req.user.userId

    // 特定ユーザーの予約を取得
    const reservations = await Reservation.selectReservationsByUser(userId)

    // 成功レスポンス
    res.status(200).json({ message: '予約一覧取得成功', reservations })
  } catch (err) {
    // エラーハンドリング
    res.status(500).json({ error: '予約取得中にエラーが発生しました', details: err.message })
  }
}

// 予約新規作成
exports.create = async (req, res) => {}

// 予約編集
exports.update = async (req, res) => {}

// 予約削除
exports.delete = async (req, res) => {}
