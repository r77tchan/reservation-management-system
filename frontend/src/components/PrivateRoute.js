import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function PrivateRoute() {
  const token = localStorage.getItem('token') // ログイン状態をチェック
  return token ? <Outlet /> : <Navigate to="/auth" replace />
}

export default PrivateRoute
