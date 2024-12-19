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

  // initialDataが存在する場合は編集モードの為、情報セット
  useEffect(() => {
    if (initialData) {
      setIsEditMode(true)
      setFormData({
        date: formatDate2(initialData.date),
        time: initialData.time,
        status: String(initialData.status),
      })
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

  return (
    <div className="create-container">
      <h1>{isEditMode ? '予約を編集する' : '予約を作成する'}</h1>
      {error && <p className="error">{error}</p>} {/* エラーメッセージ */}
      <form onSubmit={handleSubmit}>
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
            <button type="submit">{isEditMode ? '予約を編集' : '予約を作成'}</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Create
