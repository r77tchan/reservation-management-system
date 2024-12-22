const Notification = require('../models/Notification')

// 通知追加
exports.send = async (req, res) => {
  try {
    const reservation_id = req.body.id
    // 既に予約が通知登録されている場合は終了
    const existingNotification = await Notification.selectNotificationByReservation_id(reservation_id)
    if (existingNotification.length !== 0) {
      return res.status(409).json({ error: '既に通知が登録されています' })
    }
    // 新しい通知を登録
    await Notification.insertNotification(reservation_id)
    res.status(201).json({ message: '通知追加成功' })
  } catch (err) {
    res.status(500).json({ error: '通知追加中にエラーが発生しました', details: err.message })
  }
}
