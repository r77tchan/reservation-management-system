import React, { useContext } from 'react'
import { NotificationContext } from './NotificationContext'
import { formatTime, formatDate } from '../utils/format'
import './Notification.css'

const Notification = () => {
  const { notifications } = useContext(NotificationContext)
  return (
    <div>
      <ul className="notification-ul">
        {notifications.map((notification, index) => (
          <li key={index} className="notification-li">{`24時間後以内の通知を検知: ${formatDate(
            notification.date
          )} ${formatTime(notification.time)}`}</li>
        ))}
      </ul>
    </div>
  )
}

export default Notification
