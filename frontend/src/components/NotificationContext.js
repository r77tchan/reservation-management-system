import React, { createContext, useEffect, useState } from 'react'
import { io } from 'socket.io-client'

export const NotificationContext = createContext()

const socket = io('http://localhost:3001') // サーバーのURL

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    // 通知イベントを受信
    socket.on('test', (data) => {
      console.log('通知を受信:', data)
      setNotifications((prev) => [...prev, data])
    })

    return () => {
      socket.off('test') // クリーンアップ
    }
  }, [])

  return <NotificationContext.Provider value={{ notifications }}>{children}</NotificationContext.Provider>
}
