import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../my.css'

function Top() {
  const navigate = useNavigate()

  const handleLogout = () => {
    // トークンをローカルストレージから削除
    localStorage.removeItem('token')

    // ログインページにリダイレクト
    navigate('/auth')
  }

  return (
    <div className="top-container">
      <h1>ようこそ、予約管理システムへ</h1>
      <button className="logout-button" onClick={handleLogout}>
        ログアウト
      </button>
    </div>
  )
}

export default Top
