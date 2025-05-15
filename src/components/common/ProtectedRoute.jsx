"use client"

import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { currentUser, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  if (!currentUser) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // Handle redirecting recruiter role to employer routes
  if (currentUser.role === "recruiter") {
    // Update the user's role in memory
    currentUser.role = "employer"

    // If trying to access recruiter routes, redirect to equivalent employer routes
    if (location.pathname.startsWith("/recruiter")) {
      const newPath = location.pathname.replace("/recruiter", "/employer")
      return <Navigate to={newPath} replace />
    }
  }

  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    // Redirect to home if not authorized
    return <Navigate to="/" replace />
  }

  return children
}

export default ProtectedRoute
