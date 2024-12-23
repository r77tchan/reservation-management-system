import React, { createContext, useEffect, useState } from 'react'
import { io } from 'socket.io-client'

export const NotificationContext = createContext()

const socket = io(process.env.API_BASE_URL) // サーバーのURL

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    // JWTを取得して送信
    const token = localStorage.getItem('token')
    if (token) {
      socket.emit('authenticate', token)
    }

    socket.off('notification') // 重複登録を防ぐために、登録前にリスナーをクリア
    // 通知イベントを受信
    socket.on('notification', (data) => {
      console.log('通知を受信:', data)
      setNotifications((prev) => [...prev, data])
    })

    // test
    socket.on('test', (data) => {
      console.log(data)
    })

    return () => {
      socket.off('test') // クリーンアップ
    }
  }, [])

  return <NotificationContext.Provider value={{ notifications }}>{children}</NotificationContext.Provider>
}
