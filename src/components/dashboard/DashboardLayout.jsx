import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import {
  LayoutDashboard,
  Briefcase,
  Bell,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  Lock,
  FileText,
  UserCircle,
  Star,
  Trash2,
  Eye,
} from "lucide-react"

const DashboardLayout = ({ children }) => {
  const { currentUser, logout } = useAuth()
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const employerNavItems = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      href: "/employer/dashboard",
    },
    {
      name: "My Profile",
      icon: UserCircle,
      href: "/employer/profile",
    },
    {
      name: "Post a New Job",
      icon: Briefcase,
      href: "/employer/create-job",
    },
    {
      name: "Manage Jobs",
      icon: FileText,
      href: "/employer/manage-jobs",
    },
    {
      name: "All Applicants",
      icon: Users,
      href: "/employer/all-applicants",
    },
    {
      name: "Shortlisted Resumes",
      icon: Star,
      href: "/employer/shortlisted-resumes",
    },
    {
      name: "Resume Alerts",
      icon: Bell,
      href: "/employer/resume-alerts",
    },
    {
      name: "Change Password",
      icon: Lock,
      href: "/employer/change-password",
    },
    {
      name: "Delete Profile",
      icon: Trash2,
      href: "/employer/delete-profile",
    },
  ]

  const candidateNavItems = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      href: "/candidate/dashboard",
    },
    {
      name: "My Profile",
      icon: UserCircle,
      href: "/candidate/profile",
    },
    {
      name: "My Resume",
      icon: FileText,
      href: "/candidate/resume",
    },
    {
      name: "Applied Jobs",
      icon: Briefcase,
      href: "/candidate/applied-jobs",
    },
    {
      name: "Job Alerts",
      icon: Bell,
      href: "/candidate/job-alerts",
    },
    {
      name: "Shortlisted Jobs",
      icon: Star,
      href: "/candidate/shortlisted-jobs",
    },
    {
      name: "Change Password",
      icon: Lock,
      href: "/candidate/change-password",
    },
    {
      name: "View Profile",
      icon: Eye,
      href: "/candidate/view-profile",
    },
    {
      name: "Delete Profile",
      icon: Trash2,
      href: "/candidate/delete-profile",
    },
  ]

  const navItems = currentUser?.role === "employer" ? employerNavItems : candidateNavItems

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error("Failed to logout:", error)
    }
  }

  // Sidebar Content Component
  const SidebarContent = () => (
    <div className="h-full flex flex-col">
      <div className="flex-shrink-0 px-6 py-4 border-b">
        <Link to="/" className="text-xl font-bold text-blue-600">
          JobConnect
        </Link>
      </div>
      <div className="flex-shrink-0 p-4 border-b">
        <div className="flex items-center">
          {currentUser?.profileImage ? (
            <img
              src={currentUser.profileImage}
              alt={currentUser.name}
              className="h-8 w-8 rounded-full"
            />
          ) : (
            <div className="h-8 w-8 bg-blue-100 text-blue-600 flex items-center justify-center rounded-full">
              {currentUser?.name?.charAt(0)}
            </div>
          )}
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-700">{currentUser?.name}</p>
            <p className="text-xs text-gray-500">{currentUser?.email}</p>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        <nav className="px-4 py-6 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.href
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </div>
      <div className="flex-shrink-0 p-4 border-t">
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-md"
        >
          <LogOut className="mr-3 h-5 w-5" />
          Logout
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile menu */}
      <div className="lg:hidden">
        <div className="flex items-center justify-between p-4 bg-white border-b">
          <Link to="/" className="text-xl font-bold text-blue-600">
            JobConnect
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-gray-600 hover:text-gray-900"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-40 bg-black bg-opacity-25" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="fixed inset-y-0 left-0 w-64 bg-white" onClick={e => e.stopPropagation()}>
              <SidebarContent />
            </div>
          </div>
        )}
      </div>

      {/* Desktop layout */}
      <div className="hidden lg:flex">
        {/* Sidebar */}
        <div className="fixed inset-y-0 left-0 w-64 bg-white border-r">
          <SidebarContent />
        </div>

        {/* Main content */}
        <div className="flex-1 min-w-0 ml-64">
          <div className="p-8">{children}</div>
        </div>
      </div>

      {/* Mobile main content */}
      <div className="lg:hidden">
        <div className="p-4">{children}</div>
      </div>
    </div>
  )
}

export default DashboardLayout