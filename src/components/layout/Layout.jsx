"use client"

import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer"

const Layout = ({ children }) => {
  const location = useLocation()

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  // Check if current path is a dashboard path
  const isDashboardPage = location.pathname.includes('/employer/') || location.pathname.includes('/candidate/')

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">{children}</main>
      {!isDashboardPage && <Footer />}
    </div>
  )
}

export default Layout
