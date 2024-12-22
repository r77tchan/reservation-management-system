import React, { useContext } from 'react'
import { NotificationContext } from './NotificationContext'

const Notification = () => {
  const { notifications } = useContext(NotificationContext)
  return (
    <div>
      <h2>通知一覧</h2>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index}>{notification.message}</li>
        ))}
      </ul>
    </div>
  )
}

export default Notification
