import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Header.css'

function Header() {
  const navigate = useNavigate()

  const handleLogout = () => {
    // ローカルストレージから削除 = ログアウト
    localStorage.removeItem('token')
    localStorage.removeItem('username')

    // ログインページにリダイレクト
    navigate('/auth')
  }

  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">ホーム</Link>
          </li>
          <li>
            <Link to="/view">予約一覧</Link>
          </li>
          <li>
            <span className="logout" onClick={handleLogout}>
              ログアウト
            </span>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
