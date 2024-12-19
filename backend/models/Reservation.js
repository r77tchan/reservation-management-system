const database = require('../config/database')

const Reservation = {
  // 予約追加
  insertReservation: (data) => {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO reservations (user_id, date, time, status) VALUES (?, ?, ?, ?)`
      database.query(query, [data.user_id, data.date, data.time, data.status], (err, results) => {
        if (err) return reject(err)
        resolve(results)
      })
    })
  },

  // 特定ユーザーの予約を全取得
  selectReservationsByUser: (userId) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM reservations WHERE user_id = ? ORDER BY date ASC, time ASC`
      database.query(query, [userId], (err, results) => {
        if (err) return reject(err)
        resolve(results)
      })
    })
  },

  // 予約編集 (2024-01-01) (14:00)
  updateReservation: (data) => {
    return new Promise((resolve, reject) => {
      const query = `
        UPDATE reservations
        SET date = ?, time = ?, status = ?
        WHERE id = ?
      `
      database.query(query, [data.date, data.time, data.status, data.id], (err, results) => {
        if (err) return reject(err) // エラー時は reject
        resolve(results) // 成功時は resolve
      })
    })
  },

  // 予約削除
  deleteReservation: (reservationId) => {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM reservations WHERE id = ?`
      database.query(query, [reservationId], (err, results) => {
        if (err) return reject(err)
        resolve(results)
      })
    })
  },
}

module.exports = Reservation
