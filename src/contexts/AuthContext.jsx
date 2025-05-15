"use client"

import { createContext, useState, useContext, useEffect } from "react"
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

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem("token")
    if (token) {
      try {
        const decoded = jwtDecode(token)
        // Check if token is expired
        if (decoded.exp * 1000 < Date.now()) {
          localStorage.removeItem("token")
          localStorage.removeItem("userData")
          setCurrentUser(null)
        } else {
          // Get user data from local storage for demo
          const userData = JSON.parse(localStorage.getItem("userData") || "{}")
          setCurrentUser(userData)
          api.defaults.headers.common["Authorization"] = `Bearer ${token}`
        }
      } catch (error) {
        localStorage.removeItem("token")
        localStorage.removeItem("userData")
        setCurrentUser(null)
      }
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    // Load notifications
    if (currentUser) {
      loadNotifications(currentUser.id)
    }
  }, [currentUser?.id])

  useEffect(() => {
    // Update unread count whenever notifications change
    const newUnreadCount = notifications.filter(n => !n.read).length
    setUnreadCount(newUnreadCount)
  }, [notifications])

  const loadNotifications = async (userId) => {
    try {
      // In a real app, this would be an API call
      // For now, we'll use mock data
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
  }

  const login = async (email, password) => {
    try {
      setError(null)
      // In a real app, this would be an API call
      // For demo purposes, we'll simulate a successful login with different roles
      let userData

      if (email === "employer@example.com" || email === "recruiter@example.com") {
        // Merge recruiter and employer roles
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
          bio:
            email === "recruiter@example.com"
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
        // Default to candidate for demo
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

      // Create a JWT token (in a real app, this would come from the server)
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkpvaG4gRG9lIiwiZW1haWwiOiJqb2huQGV4YW1wbGUuY29tIiwicm9sZSI6ImNhbmRpZGF0ZSIsImV4cCI6MTcxNzAyNDQwMH0.8Yvd5VBvTGBvKA7Hw9-WFVJl9VBmgGVG4RmTxmgMQZY"

      localStorage.setItem("token", token)
      localStorage.setItem("userData", JSON.stringify(userData)) // Store user data for demo
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`

      setCurrentUser(userData)
      return userData
    } catch (err) {
      setError(err.message || "Failed to login")
      throw err
    }
  }

  const signup = async (userData) => {
    try {
      setError(null)
      // In a real app, this would be an API call
      // For demo purposes, we'll simulate a successful signup
      const { fullName, email, password, gender, address, userType, profileImage } = userData

      // Convert any "Recruiter" userType to "Employer"
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
        // Role-specific fields
        ...(role === "candidate" && {
          skills: "",
          education: "",
          experience: "",
        }),
        ...(role === "employer" && {
          company: "",
          position: "",
          specialization: "", // Add specialization field for all employers
        }),
      }

      // Create a JWT token (in a real app, this would come from the server)
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkpvaG4gRG9lIiwiZW1haWwiOiJqb2huQGV4YW1wbGUuY29tIiwicm9sZSI6ImNhbmRpZGF0ZSIsImV4cCI6MTcxNzAyNDQwMH0.8Yvd5VBvTGBvKA7Hw9-WFVJl9VBmgGVG4RmTxmgMQZY"

      localStorage.setItem("token", token)
      localStorage.setItem("userData", JSON.stringify(newUser)) // Store user data for demo
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`

      setCurrentUser(newUser)
      return newUser
    } catch (err) {
      setError(err.message || "Failed to sign up")
      throw err
    }
  }

  const updateProfile = async (updatedData) => {
    try {
      setError(null)
      // In a real app, this would be an API call
      // For demo purposes, we'll update the local state

      const updatedUser = {
        ...currentUser,
        ...updatedData,
      }

      // Update local storage for demo persistence
      localStorage.setItem("userData", JSON.stringify(updatedUser))

      setCurrentUser(updatedUser)
      return updatedUser
    } catch (err) {
      setError(err.message || "Failed to update profile")
      throw err
    }
  }

  const updateProfileImage = async (imageFile) => {
    try {
      setError(null)

      // In a real app, this would upload the image to a server
      // For demo purposes, we'll convert it to a data URL
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onloadend = () => {
          const imageUrl = reader.result

          // Update user data with the new image URL
          const updatedUser = {
            ...currentUser,
            profileImage: imageUrl,
          }

          // Update local storage for demo persistence
          localStorage.setItem("userData", JSON.stringify(updatedUser))

          setCurrentUser(updatedUser)
          resolve(updatedUser)
        }
        reader.onerror = reject
        reader.readAsDataURL(imageFile)
      })
    } catch (err) {
      setError(err.message || "Failed to update profile image")
      throw err
    }
  }

  const getUserProfile = (userId) => {
    // In a real app, this would fetch from the API
    // For demo, we'll return mock data if not found
    return {
      id: userId,
      name: "John Doe",
      email: "john@example.com",
      title: "Software Developer",
      phone: "+1 (555) 123-4567",
      address: "San Francisco, CA",
      skills: "JavaScript, React, Node.js",
      education: "BS Computer Science, Stanford University",
      experience: "5 years of full-stack development experience",
      bio: "Passionate developer with expertise in modern web technologies",
      isPublic: true,
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("userData")
    delete api.defaults.headers.common["Authorization"]
    setCurrentUser(null)
  }

  const markNotificationAsRead = async (notificationId) => {
    setNotifications(prev => 
      prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
    )
  }

  const markAllNotificationsAsRead = async () => {
    try {
      // In a real app, this would be an API call
      setNotifications(prev => prev.map(n => ({ ...n, read: true })))
      setUnreadCount(0)
    } catch (error) {
      console.error("Error marking all notifications as read:", error)
    }
  }

  const addNotification = (notification) => {
    setNotifications(prev => [...prev, { ...notification, read: false }])
  }

  const deleteNotification = (notificationId) => {
    setNotifications(prev => prev.filter(notif => notif.id !== notificationId))
  }

  const clearAllNotifications = () => {
    setNotifications([])
  }

  const value = {
    currentUser,
    setCurrentUser,
    loading,
    error,
    login,
    signup,
    logout,
    updateProfile,
    updateProfileImage,
    getUserProfile,
    isAuthenticated: !!currentUser,
    notifications,
    unreadCount,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    addNotification,
    deleteNotification,
    clearAllNotifications
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
