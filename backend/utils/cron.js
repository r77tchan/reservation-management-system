const cron = require('node-cron')
const Notification = require('../models/Notification')
const { getSocketInstance } = require('../utils/socket')

cron.schedule('* * * * *', async () => {
  console.log('1分ごとに実行されています')
  // 1分ごとに、dbにアクセスをして24時間後以内に迫った通知を検索する

  // 見つかったらそのユーザーに通知を送信して、削除

  const io = getSocketInstance() // 初期化済みの io インスタンスを取得
  io.emit('test', {
    message: 'hi',
  })
})

const test = async () => {
  const results = await Notification.selectNotificationsWithin24Hours()
  console.log(results)
}

// test()
