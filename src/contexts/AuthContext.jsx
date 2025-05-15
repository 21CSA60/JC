import { createContext, useState, useContext, useEffect, useCallback } from "react"
import { jwtDecode } from "jwt-decode"
import api from "../services/api"

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [notifications, setNotifications] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Load user data from localStorage on mount
  useEffect(() => {
    const loadUserData = () => {
      const token = localStorage.getItem("token")
      if (token) {
        try {
          const decoded = jwtDecode(token)
          if (decoded.exp * 1000 < Date.now()) {
            handleLogout()
          } else {
            const userData = JSON.parse(localStorage.getItem("userData") || "{}")
            setCurrentUser(userData)
            api.defaults.headers.common["Authorization"] = `Bearer ${token}`
            loadNotifications(userData.id)
          }
        } catch (error) {
          handleLogout()
        }
      }
      setLoading(false)
    }

    loadUserData()
  }, [])

  // Update unread count whenever notifications change
  useEffect(() => {
    const newUnreadCount = notifications.filter(n => !n.read).length
    setUnreadCount(newUnreadCount)
  }, [notifications])

  const handleLogout = useCallback(() => {
    localStorage.removeItem("token")
    localStorage.removeItem("userData")
    delete api.defaults.headers.common["Authorization"]
    setCurrentUser(null)
    setNotifications([])
    setUnreadCount(0)
  }, [])

  const loadNotifications = useCallback(async (userId) => {
    try {
      const mockNotifications = [
        {
          id: 1,
          title: "Application Status Updated",
          description: "Your application for Frontend Developer has been reviewed",
          time: "2 hours ago",
          read: false,
          link: "/candidate/applied-jobs"
        },
        {
          id: 2,
          title: "New Job Match",
          description: "A new job matching your profile is available",
          time: "1 day ago",
          read: false,
          link: "/jobs"
        }
      ]
      setNotifications(mockNotifications)
    } catch (error) {
      console.error("Error loading notifications:", error)
    }
  }, [])

  const login = useCallback(async (email, password) => {
    try {
      setError(null)
      let userData

      if (email === "employer@example.com" || email === "recruiter@example.com") {
        userData = {
          id: 1,
          name: email === "recruiter@example.com" ? "Employer (Recruiter)" : "Employer User",
          email,
          role: "employer",
          phone: "+1 (555) 123-4567",
          address: "123 Business Ave, New York, NY",
          company: email === "recruiter@example.com" ? "Talent Finders LLC" : "Tech Solutions Inc.",
          position: email === "recruiter@example.com" ? "Talent Acquisition Manager" : "HR Manager",
          specialization: email === "recruiter@example.com" ? "Tech and Engineering" : "",
          bio: email === "recruiter@example.com"
            ? "Helping companies find the best talent for over 5 years."
            : "Experienced HR professional with a focus on tech recruitment.",
          profileImage: null,
        }
      } else if (email === "candidate@example.com") {
        userData = {
          id: 2,
          name: "Candidate User",
          email,
          role: "candidate",
          phone: "+1 (555) 987-6543",
          address: "456 Job Seeker St, San Francisco, CA",
          skills: "JavaScript, React, Node.js",
          education: "BS Computer Science, Stanford University",
          experience: "3 years as Frontend Developer",
          bio: "Passionate developer looking for new opportunities in tech.",
          profileImage: null,
        }
      } else {
        userData = {
          id: 4,
          name: "Demo User",
          email,
          role: "candidate",
          phone: "",
          address: "",
          skills: "",
          education: "",
          experience: "",
          bio: "",
          profileImage: null,
        }
      }

      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkpvaG4gRG9lIiwiZW1haWwiOiJqb2huQGV4YW1wbGUuY29tIiwicm9sZSI6ImNhbmRpZGF0ZSIsImV4cCI6MTcxNzAyNDQwMH0.8Yvd5VBvTGBvKA7Hw9-WFVJl9VBmgGVG4RmTxmgMQZY"

      localStorage.setItem("token", token)
      localStorage.setItem("userData", JSON.stringify(userData))
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`

      setCurrentUser(userData)
      loadNotifications(userData.id)
      return userData
    } catch (err) {
      setError(err.message || "Failed to login")
      throw err
    }
  }, [loadNotifications])

  const signup = useCallback(async (userData) => {
    try {
      setError(null)
      const { fullName, email, password, gender, address, userType, profileImage } = userData

      const role = userType.toLowerCase() === "recruiter" ? "employer" : userType.toLowerCase()

      const newUser = {
        id: Math.floor(Math.random() * 1000),
        name: fullName,
        email,
        role,
        gender,
        address,
        phone: "",
        bio: "",
        profileImage: profileImage || null,
        ...(role === "candidate" && {
          skills: "",
          education: "",
          experience: "",
        }),
        ...(role === "employer" && {
          company: "",
          position: "",
          specialization: "",
        }),
      }

      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkpvaG4gRG9lIiwiZW1haWwiOiJqb2huQGV4YW1wbGUuY29tIiwicm9sZSI6ImNhbmRpZGF0ZSIsImV4cCI6MTcxNzAyNDQwMH0.8Yvd5VBvTGBvKA7Hw9-WFVJl9VBmgGVG4RmTxmgMQZY"

      localStorage.setItem("token", token)
      localStorage.setItem("userData", JSON.stringify(newUser))
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`

      setCurrentUser(newUser)
      loadNotifications(newUser.id)
      return newUser
    } catch (err) {
      setError(err.message || "Failed to sign up")
      throw err
    }
  }, [loadNotifications])

  const updateProfile = useCallback(async (updatedData) => {
    try {
      setError(null)
      const updatedUser = {
        ...currentUser,
        ...updatedData,
      }
      localStorage.setItem("userData", JSON.stringify(updatedUser))
      setCurrentUser(updatedUser)
      return updatedUser
    } catch (err) {
      setError(err.message || "Failed to update profile")
      throw err
    }
  }, [currentUser])

  const markNotificationAsRead = useCallback((notificationId) => {
    setNotifications(prev => 
      prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
    )
  }, [])

  const markAllNotificationsAsRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }, [])

  const addNotification = useCallback((notification) => {
    setNotifications(prev => [...prev, { ...notification, read: false }])
  }, [])

  const deleteNotification = useCallback((notificationId) => {
    setNotifications(prev => prev.filter(notif => notif.id !== notificationId))
  }, [])

  const value = {
    currentUser,
    loading,
    error,
    login,
    signup,
    logout: handleLogout,
    updateProfile,
    isAuthenticated: !!currentUser,
    notifications,
    unreadCount,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    addNotification,
    deleteNotification,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}