import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../my.css'

function Auth() {
  const navigate = useNavigate()
  const [isLoginMode, setIsLoginMode] = useState(true) // モードの切り替え

  // ページロード時にログイン済みならリダイレクト
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      navigate('/')
    }
  }, [navigate])

  // フォームデータ管理
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  })

  // 入力フォーム変更
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
    const endpoint = isLoginMode
      ? 'http://localhost:3001/auth/login' // ログインエンドポイント
      : 'http://localhost:3001/auth/register' // 新規登録エンドポイント
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      if (response.ok) {
        const data = await response.json()
        localStorage.setItem('token', data.token) // トークンを保存
        localStorage.setItem('username', data.username) // ユーザー名を保存
        navigate('/') // トップページにリダイレクト
      } else {
        const errorData = await response.json()
        console.error('エラー:', errorData)
        alert(
          isLoginMode ? 'ログインに失敗しました。' : '新規登録に失敗しました。'
        )
      }
    } catch (error) {
      console.error('ネットワークエラー:', error)
      alert('エラーが発生しました。')
    }
  }

  // パスワードリセットメール
  const handleResetMail = async () => {
    // 入力されているメールアドレスを取得
    const email = formData.email
    if (!email) {
      alert('メールアドレスを入力してください。')
      return
    }
    try {
      const response = await fetch(
        'http://localhost:3001/auth/reset-password',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }), // メールアドレスを送信
        }
      )
      if (response.ok) {
        alert('パスワードリセットメールを送信しました。')
      } else {
        const errorData = await response.json()
        console.error('エラー:', errorData)
        alert('リセットメールの送信に失敗しました。')
      }
    } catch (error) {
      console.error('ネットワークエラー:', error)
      alert('エラーが発生しました。')
    }
  }

  // body
  return (
    <div>
      <form>
        <h1 className="form-title">{isLoginMode ? 'ログイン' : '新規登録'}</h1>
        <div className="form-wrapper">
          {!isLoginMode && ( // 新規登録モードの場合のみ表示
            <div className="form-row">
              <label>
                氏名
                <br />
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </label>
            </div>
          )}
          <div className="form-row">
            <label>
              メールアドレス
              <br />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="form-row">
            <label>
              パスワード
              <br />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="form-row">
            <button onClick={handleSubmit}>
              {isLoginMode ? 'ログイン' : '登録'}
            </button>
          </div>
          <div className="form-row">
            {isLoginMode ? (
              <>
                アカウントをお持ちでない場合は
                <span
                  className="form-link"
                  onClick={() => setIsLoginMode(false)}
                >
                  登録
                </span>
              </>
            ) : (
              <>
                既にアカウントをお持ちの場合は
                <span
                  className="form-link"
                  onClick={() => setIsLoginMode(true)}
                >
                  ログイン
                </span>
              </>
            )}
          </div>
          {isLoginMode && (
            <div className="form-row">
              パスワードリセットメールを
              <span className="form-link" onClick={handleResetMail}>
                送信
              </span>
            </div>
          )}
        </div>
      </form>
    </div>
  )
}

export default Auth
