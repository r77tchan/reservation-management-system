// トップ画面

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

  const handleViewClick = () => {
    navigate('/view')
  }

  return (
    <div className="top-container">
      <h1>ようこそ、{username}、予約管理システムへ</h1>
      <p>ここで簡単に予約を管理できます。</p>
      <button onClick={handleViewClick}>予約一覧を見る</button>
    </div>
  )
}

export default Top
