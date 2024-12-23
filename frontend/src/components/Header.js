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
        <ul className="header-ul">
          <Link to="/">
            <li className="header-li">ホーム</li>
          </Link>
          <Link to="/view">
            <li className="header-li">予約一覧</li>
          </Link>
          <li className="logout header-li" onClick={handleLogout}>
            ログアウト
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
