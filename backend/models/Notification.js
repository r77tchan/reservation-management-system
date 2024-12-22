const database = require('../config/database')

const Notification = {
  // 通知追加
  insertNotification: (reservation_id) => {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO notifications (reservation_id) VALUES (?)`
      database.query(query, [reservation_id], (err, results) => {
        if (err) return reject(err)
        resolve(results)
      })
    })
  },
  // 全ての通知を取得
  selectAllNotifications: () => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM notifications`
      database.query(query, [], (err, results) => {
        if (err) return reject(err)
        resolve(results)
      })
    })
  },
  // 指定idの通知を削除
  deleteNotificationById: (id) => {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM notifications WHERE id = ?`
      database.query(query, [id], (err, results) => {
        if (err) return reject(err)
        resolve(results)
      })
    })
  },
  // 指定のreservation_idのrowをselect(既に予約が通知登録されているか確認する為に使用)
  selectNotificationByReservation_id: (reservation_id) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM notifications WHERE reservation_id = ?`
      database.query(query, [reservation_id], (err, results) => {
        if (err) return reject(err)
        resolve(results)
      })
    })
  },
  // 24時間以内に迫った通知を取得
  selectNotificationsWithin24Hours: () => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT n.id, n.reservation_id, r.date, r.time
        FROM notifications n
        JOIN reservations r ON n.reservation_id = r.id
        WHERE TIMESTAMP(r.date, r.time) <= DATE_ADD(NOW(), INTERVAL 24 HOUR)
      `
      database.query(query, [], (err, results) => {
        if (err) return reject(err)
        resolve(results)
      })
    })
  },
}

module.exports = Notification
