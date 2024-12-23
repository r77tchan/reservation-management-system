// View.jsから読み込まれる、リスト表示の予約一覧

import React from 'react'
import { useNavigate } from 'react-router-dom'
import { getStatusLabel, formatTime, formatDate } from '../utils/format'
import '../my.css'

// View.jsから予約一覧データと削除ボタン押下関数を受け取る
const ReservationList = ({ reservations, handleDelete }) => {
  const navigate = useNavigate()

  return (
    <div>
      <table className="view-table">
        <thead>
          <tr>
            <th>日付</th>
            <th>時間</th>
            <th>ステータス</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation.id}>
              <td>{formatDate(reservation.date)}</td>
              <td>{formatTime(reservation.time)}</td>
              <td>{getStatusLabel(reservation.status)}</td>
              <td>
                {/*予約データを渡して編集画面(Create.js)へ遷移*/}
                <button onClick={() => navigate('/create', { state: reservation })}>編集</button>
                <button className="delete-button" onClick={() => handleDelete(reservation.id)}>
                  削除
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ReservationList
