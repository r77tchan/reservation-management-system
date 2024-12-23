// 予約一覧画面。フラグを管理してカレンダービューとリストビューを切り替え可能

import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import ReservationList from '../components//ReservationList'
import Calendar from '../components//Calendar'
import '../my.css'

const View = () => {
  const [reservations, setReservations] = useState([]) // 予約データの内部変数
  const [isCalendarView, setIsCalendarView] = useState(
    localStorage.getItem('isCalendarView') === 'true' // localStorage の値を論理型に変換(必ず論理値型が格納される)
  )
  const navigate = useNavigate()

  // 読み込み時、データ取得処理
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await fetch('http://localhost:3001/reservations', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`, // リクエストにトークンを含めてサーバー側で不正チェック
          },
        })

        if (response.ok) {
          const data = await response.json()
          setReservations(data.reservations) // 取得した予約データを保存
        } else {
          console.error('データ取得失敗')
        }
      } catch (err) {
        console.error('ネットワークエラー', err)
      }
    }

    fetchReservations()
  }, [])

  // ReservationList.jsに渡す削除処理
  const handleDelete = async (id) => {
    if (!window.confirm('削除しますか？')) return
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`http://localhost:3001/reservations/${id}/delete`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      })

      if (response.ok) {
        // 現在の状態を更新
        setReservations((prev) => prev.filter((reservation) => reservation.id !== id))
      } else {
        console.error('削除失敗')
      }
    } catch (err) {
      console.error('ネットワークエラー', err)
    }
  }

  return (
    <div className="view-container">
      <h1>予約一覧</h1>
      {!isCalendarView ? (
        <ReservationList reservations={reservations} handleDelete={handleDelete} />
      ) : (
        <Calendar reservations={reservations} />
      )}
      <div className="view-button-under">
        <button onClick={() => navigate('/create')}>新規作成</button>
        <button
          onClick={() => {
            localStorage.setItem('isCalendarView', String(!isCalendarView))
            setIsCalendarView(!isCalendarView) // ここ非同期なので保存する順番大事
          }}
        >
          {isCalendarView ? 'リスト表示' : 'カレンダー表示'}
        </button>
      </div>
    </div>
  )
}

export default View
