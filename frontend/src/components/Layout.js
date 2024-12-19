import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'

function Layout() {
  return (
    <>
      {/* ヘッダー */}
      <Header />
      {/* メインコンテンツ */}
      <main>
        <Outlet />
      </main>
      {/* 将来的にフッターなどを追加可能 */}
    </>
  )
}

export default Layout
