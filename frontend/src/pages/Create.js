import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import { formatDate2 } from '../utils/format'
import '../my.css'

function Create() {
  const navigate = useNavigate()
  const { state: initialData } = useLocation()

  const [formData, setFormData] = useState({
    date: '',
    time: '',
    status: '0', // 初期値は"確認済み"
  })
  const [error, setError] = useState(null)

  const [isEditMode, setIsEditMode] = useState(false)

  // initialDataが存在する場合
  useEffect(() => {
    if (initialData) {
      if (initialData.isOnlyDate) {
        // Calendarから日付のみ指定の場合
        setFormData((prevFormData) => ({
          ...prevFormData, // 以前の状態を保持
          date: formatDate2(initialData.date), // date を更新
        }))
      } else {
        // ReservationListから編集の場合、編集モードへ
        setIsEditMode(true)
        setFormData({
          date: formatDate2(initialData.date),
          time: initialData.time,
          status: String(initialData.status),
          id: initialData.id,
        })
      }
    }
  }, [initialData])

  // フォームの変更を管理
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  // フォーム送信
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const token = localStorage.getItem('token') // トークンを取得

      const url = isEditMode
        ? `http://localhost:3001/reservations/${initialData.id}`
        : `http://localhost:3001/reservations/create`
      const method = isEditMode ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // トークンを送信
        },
        body: JSON.stringify(formData), // フォームデータを送信
      })

      if (response.ok) {
        navigate('/view')
      } else {
        const errorData = await response.json()
        setError(errorData.error || '失敗しました。')
      }
    } catch (err) {
      setError('ネットワークエラーが発生しました。')
    }
  }

  // 削除送信、View.jsのとは同名の別関数
  const handleDelete = async (e) => {
    e.preventDefault()

    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`http://localhost:3001/reservations/${formData.id}/delete`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      })

      if (response.ok) {
        // 削除成功時遷移
        navigate('/view')
      } else {
        const errorData = await response.json()
        setError(errorData.error || '失敗しました。')
      }
    } catch (err) {
      setError('ネットワークエラーが発生しました。')
    }
  }

  // 通知リクエストを送信
  const handleNotice = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('token')

      const response = await fetch('http://localhost:3001/notifications/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // トークンを送信
        },
        body: JSON.stringify(formData), // フォームデータを送信
      })

      if (response.ok) {
        navigate('/view')
      } else {
        const errorData = await response.json()
        setError(errorData.error || '失敗しました。')
      }
    } catch (err) {
      setError('ネットワークエラーが発生しました。')
    }
  }

  return (
    <div className="create-container">
      <h1>{isEditMode ? '予約を編集する' : '予約を作成する'}</h1>
      {error && <p className="error">{error}</p>} {/* エラーメッセージ */}
      <form>
        <div className="form-wrapper">
          <div className="form-row">
            <label>
              日付
              <br />
              <input type="date" name="date" value={formData.date} onChange={handleChange} />
            </label>
          </div>
          <div className="form-row">
            <label>
              時間
              <br />
              <input type="time" name="time" value={formData.time} onChange={handleChange} />
            </label>
          </div>
          <div className="form-row">
            <label>
              ステータス
              <br />
              <select name="status" value={formData.status} onChange={handleChange}>
                <option value="0">確認済み</option>
                <option value="1">未確認</option>
                <option value="2">失敗</option>
              </select>
            </label>
          </div>
          <div className="form-row">
            <button onClick={handleSubmit}>{isEditMode ? '予約を編集' : '予約を作成'}</button>
          </div>
          {isEditMode && (
            <>
              <div className="form-row">
                <button onClick={handleDelete} className="delete-button">
                  削除
                </button>
              </div>
              <div className="form-row">
                <button onClick={handleNotice} className="notice-button">
                  通知登録
                </button>
              </div>
            </>
          )}
        </div>
      </form>
    </div>
  )
}

export default Create
