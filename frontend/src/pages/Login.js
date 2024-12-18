import React, { useState } from 'react'
import '../my.css'

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch('http://localhost:3001/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // フォームデータをJSON形式で送信
      })

      if (response.ok) {
        // サーバーからの成功応答を処理
        alert('送信に成功しました！')
      } else {
        // サーバーからのエラー応答を処理
        const errorData = await response.json()
        console.error('エラー:', errorData)
        alert('送信に失敗しました。')
      }
    } catch (error) {
      // ネットワークエラーの処理
      console.error('ネットワークエラー:', error)
      alert('エラーが発生しました。')
    }
  }

  return (
    <div>
      <form>
        <h1 className="form-title">ユーザー登録</h1>
        <div className="form-wrapper">
          <div className="form-row">
            <label>
              氏名
              <br />
              <input type="text" name="username" onChange={handleChange} />
            </label>
          </div>
          <div className="form-row">
            <label>
              メールアドレス
              <br />
              <input type="email" name="email" onChange={handleChange} />
            </label>
          </div>
          <div className="form-row">
            <label>
              パスワード
              <br />
              <input type="password" name="password" onChange={handleChange} />
            </label>
          </div>
          <div className="form-row">
            <button onClick={handleSubmit}>登録</button>
          </div>
          <div className="form-row">アカウントをお持ちでない場合は登録</div>
        </div>
      </form>
    </div>
  )
}

export default Login
