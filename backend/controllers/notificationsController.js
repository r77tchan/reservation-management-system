const Notification = require('../models/Notification')

// 通知追加
exports.send = async (req, res) => {
  try {
    const { reservation_id } = req.body
    await Notification.insertNotification(reservation_id)
    res.status(201).json({ message: '通知追加成功' })
  } catch (err) {
    res.status(500).json({ error: '通知追加中にエラーが発生しました', details: err.message })
  }
}
