import { createContext, useContext, useState, useCallback } from "react"
import { XCircle, CheckCircle, AlertCircle, Info } from "lucide-react"

const NotificationContext = createContext()

export const useNotification = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error("useNotification must be used within a NotificationProvider")
  }
  return context
}

const NOTIFICATION_TIMEOUT = 5000

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([])

  const addNotification = useCallback((message, type = "info") => {
    const id = Date.now()
    setNotifications(prev => [...prev, { id, message, type }])
    setTimeout(() => {
      setNotifications(prev => prev.filter(notification => notification.id !== id))
    }, NOTIFICATION_TIMEOUT)
  }, [])

  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
  }, [])

  const getIcon = (type) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "error":
        return <XCircle className="h-5 w-5 text-red-500" />
      case "warning":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />
      default:
        return <Info className="h-5 w-5 text-blue-500" />
    }
  }

  const getBgColor = (type) => {
    switch (type) {
      case "success":
        return "bg-green-50"
      case "error":
        return "bg-red-50"
      case "warning":
        return "bg-yellow-50"
      default:
        return "bg-blue-50"
    }
  }

  return (
    <NotificationContext.Provider value={{ addNotification, removeNotification }}>
      {children}
      <div className="fixed bottom-0 right-0 p-6 space-y-4 z-50">
        {notifications.map(({ id, message, type }) => (
          <div
            key={id}
            className={`flex items-center p-4 rounded-lg shadow-lg ${getBgColor(type)} max-w-md`}
            role="alert"
          >
            {getIcon(type)}
            <p className="ml-3 text-sm font-medium text-gray-800">{message}</p>
            <button
              onClick={() => removeNotification(id)}
              className="ml-auto pl-3"
              aria-label="Close"
            >
              <XCircle className="h-5 w-5 text-gray-400 hover:text-gray-500" />
            </button>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  )
}

export default NotificationProvider