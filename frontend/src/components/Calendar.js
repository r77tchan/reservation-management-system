// View.jsから読み込まれる、カレンダー表示の予約一覧

import React from 'react'
import { useNavigate } from 'react-router-dom'
import FullCalendar from '@fullcalendar/react' // FullCalendarコンポーネント
import dayGridPlugin from '@fullcalendar/daygrid' // 月間ビュー
import interactionPlugin from '@fullcalendar/interaction' // dateClick（セルクリック）を扱うために必要
import './Calendar.css'

// View.jsから受け取った予約一覧データ
const Calendar = ({ reservations }) => {
  const navigate = useNavigate()

  // 予約一覧データをFullCalendarのイベント形式に変換して返す関数
  const events = reservations.map((reservation) => {
    // dateから日付部分を取得し、timeを反映してISO形式に変換
    const date = new Date(reservation.date)
    const timeParts = reservation.time.split(':')
    date.setHours(Number(timeParts[0]), Number(timeParts[1]), Number(timeParts[2]))

    return {
      id: reservation.id,
      title: reservation.status === 0 ? '確認済み' : reservation.status === 1 ? '未確認' : '失敗',
      start: date.toISOString(), // ISO形式に変換して使用
      className: reservation.status === 0 ? 'green' : reservation.status === 1 ? 'yellow' : 'red',
    }
  })

  // セルクリック時の処理
  const handleDateClick = (info) => {
    // FullCalendarの仕様でinfo.dateStrにはクリックしたセルの日付が入る
    // isOnlyDateは遷移先で日付のみなら新規作成、予約データもあるなら編集だと判別してる
    navigate('/create', { state: { date: info.dateStr, isOnlyDate: true } })
  }

  // イベントクリック時の処理
  const handleEventClick = (info) => {
    const reservationId = parseInt(info.event.id) // イベントIDを取得し、整数型に変換
    const reservation = reservations.find((res) => res.id === reservationId) // 親の reservations から検索
    navigate('/create', { state: reservation })
  }

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth" // 初期表示を月表示に設定
        locale="ja"
        headerToolbar={{
          left: 'prev,next today', // 左側に配置するボタン
          center: 'title', // 中央に表示する内容
          right: 'dayGridMonth,dayGridWeek,dayGridDay', // 右側に表示するボタン
        }}
        height={'600px'}
        events={events} // イベントデータ
        dateClick={handleDateClick} // セルクリックイベント
        eventClick={handleEventClick} // イベントクリックイベント
      />
    </div>
  )
}

export default Calendar
