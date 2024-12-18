import React from 'react'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token') // トークンをローカルストレージから取得

  if (!token) {
    // トークンが存在しない場合はログインページへリダイレクト
    return <Navigate to="/auth" />
  }

  return children // 認証済みの場合は子コンポーネントを表示
}

export default PrivateRoute
