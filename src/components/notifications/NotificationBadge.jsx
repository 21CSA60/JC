import { useState, useEffect } from "react"
import { Bell } from "lucide-react"
import { useNotification } from "../../contexts/NotificationContext"

const NotificationBadge = () => {
  const { notifications } = useNotification()
  const unreadCount = notifications.length

  return (
    <div className="relative inline-flex">
      <Bell className="h-6 w-6 text-gray-500" />
      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 flex items-center justify-center">
          <span className="text-xs font-medium text-white">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        </span>
      )}
    </div>
  )
}

export default NotificationBadge