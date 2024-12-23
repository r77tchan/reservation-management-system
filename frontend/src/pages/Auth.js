// ユーザーログイン、登録画面

import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { validateFields } from '../utils/validation'
import '../my.css'

function Auth() {
  const navigate = useNavigate()
  const [isLoginMode, setIsLoginMode] = useState(true)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState({})

  // ロード時にログイン済みならリダイレクト
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      navigate('/')
    }
  }, [navigate])

  // いずれかフォーム変更時、内部変数を更新
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' })) // 入力時にエラーをクリア
  }

  // ログイン、登録ボタン押下
  const handleSubmit = async (e) => {
    e.preventDefault()

    // バリデーション関数を呼び出し
    const validationErrors = validateFields(
      isLoginMode ? { email: formData.email, password: formData.password } : formData
    )

    // バリデーションに引っ掛かっているなら終了
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    // APIリクエストの処理
    const endpoint = isLoginMode
      ? `${process.env.REACT_APP_API_BASE_URL}/auth/login`
      : `${process.env.REACT_APP_API_BASE_URL}/auth/register`

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (response.ok) {
        // 成功時トークンをローカルストレージに保存して、画面遷移
        const data = await response.json()
        localStorage.setItem('token', data.token)
        localStorage.setItem('username', data.username)
        navigate('/')
      } else {
        const errorData = await response.json()
        console.error('エラー:', errorData)
        alert(isLoginMode ? 'ログインに失敗しました。' : '新規登録に失敗しました。')
      }
    } catch (error) {
      console.error('ネットワークエラー:', error)
      alert('エラーが発生しました。')
    }
  }

  // リセットメール送信
  const handleResetMail = async () => {
    const emailError = validateFields({ email: formData.email }).email
    if (emailError) {
      setErrors((prev) => ({ ...prev, email: emailError }))
      return
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email }),
      })
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

  return (
    <div style={{ marginTop: 100 }}>
      <form>
        <h1 className="form-title">{isLoginMode ? 'ログイン' : '新規登録'}</h1>
        <div className="form-wrapper">
          {!isLoginMode && (
            <div className="form-row">
              <label>
                氏名
                <br />
                <input type="text" name="username" value={formData.username} onChange={handleInputChange} />
                {errors.username && <span className="error">{errors.username}</span>}
              </label>
            </div>
          )}
          <div className="form-row">
            <label>
              メールアドレス
              <br />
              <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
              {errors.email && <span className="error">{errors.email}</span>}
            </label>
          </div>
          <div className="form-row">
            <label>
              パスワード
              <br />
              <input type="password" name="password" value={formData.password} onChange={handleInputChange} />
              {errors.password && <span className="error">{errors.password}</span>}
            </label>
          </div>
          <div className="form-row">
            <button onClick={handleSubmit}>{isLoginMode ? 'ログイン' : '登録'}</button>
          </div>
          <div className="form-row">
            {isLoginMode ? (
              <>
                アカウントをお持ちでない場合は
                <span className="form-link" onClick={() => setIsLoginMode(false)}>
                  登録
                </span>
              </>
            ) : (
              <>
                既にアカウントをお持ちの場合は
                <span className="form-link" onClick={() => setIsLoginMode(true)}>
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
