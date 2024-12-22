const cron = require('node-cron')
const Notification = require('../models/Notification')
const { getSocketInstance, getSocketIdByUserId } = require('../utils/socket')

cron.schedule('* * * * *', async () => {
  console.log('1分ごとに実行されています')
  const io = getSocketInstance() // 初期化済みの io インスタンスを取得

  // 1分ごとに、dbにアクセスをして24時間後以内に迫った通知を検索する
  const notifications = await Notification.selectNotificationsWithin24Hours()

  // 見つかったら予約したユーザーに通知を送信
  notifications.forEach(async (notification) => {
    const user_id = notification.user_id // 通知データから user_id を取得
    const socketId = getSocketIdByUserId(user_id) // user_id から socket.id を取得
    if (socketId) {
      // 特定のユーザーに通知を送信
      io.to(socketId).emit('notification', {
        message: `予約ID ${notification.reservation_id} の通知があります。`,
        date: notification.date,
        time: notification.time,
      })
      console.log(`通知を送信: ${user_id} => ${socketId}`)
    } else {
      console.log(`通知失敗: ユーザー ${user_id} は現在オフラインです。`)
    }
    // 通知テーブルから削除する
    await Notification.deleteNotificationById(notification.id)
  })

  // test
  io.emit('test', {
    message: '1分ごと送信テスト',
  })
})
