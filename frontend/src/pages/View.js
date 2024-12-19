import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { getStatusLabel, formatTime, formatDate } from '../utils/format'
import '../my.css'

function View() {
  const navigate = useNavigate()

  const [reservations, setReservations] = useState([]) // 予約データの状態

  // ページ読み込み時にデータを取得
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await fetch('http://localhost:3001/reservations', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`, // トークンをヘッダーに添付
          },
        })

        if (response.ok) {
          const data = await response.json()
          setReservations(data.reservations) // 取得した予約データを保存
        } else {
          const errorData = await response.json()
          console.log(errorData)
          alert('console確認')
        }
      } catch (err) {
        console.log(err)
        alert('console確認')
      }
    }

    fetchReservations()
  }, []) // 初回レンダー時のみ実行

  // 削除ボタン
  const handleDelete = async (id) => {
    if (!window.confirm('削除?')) return // 確認ダイアログ
    try {
      const token = localStorage.getItem('token') // トークン取得
      const response = await fetch(`http://localhost:3001/reservations/${id}/delete`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`, // トークンをヘッダーに添付
        },
      })
      if (response.ok) {
        // 削除成功時、`reservations` 状態を更新
        setReservations((prevReservations) => prevReservations.filter((reservation) => reservation.id !== id))
        // alert('削除に成功')
      } else {
        const errorData = await response.json()
        console.log(errorData)
        alert('削除に失敗')
      }
    } catch (err) {
      console.log(err)
      alert('ネットワークエラーが発生')
    }
  }

  return (
    <div className="view-container">
      <h1>予約一覧</h1>

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
                <button onClick={() => navigate('/create', { state: reservation })}>編集</button>
                <button onClick={() => handleDelete(reservation.id)}>削除</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>
        <button onClick={() => navigate('/create')}>新規作成</button>
      </p>
    </div>
  )
}

export default View
