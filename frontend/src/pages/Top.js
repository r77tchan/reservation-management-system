import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../my.css'

function Top() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')

  useEffect(() => {
    // ページ読み込み時にlocalStorageからusernameを取得
    const storedUsername = localStorage.getItem('username')
    setUsername(storedUsername)
  }, [navigate])

  const handleLogout = () => {
    // ローカルストレージから削除 = ログアウト
    localStorage.removeItem('token')
    localStorage.removeItem('username')

    // ログインページにリダイレクト
    navigate('/auth')
  }

  return (
    <div className="top-container">
      <h1>ようこそ、{username}、予約管理システムへ</h1>
      <button className="logout-button" onClick={handleLogout}>
        ログアウト
      </button>
    </div>
  )
}

export default Top
