import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useJob } from "../../contexts/JobContext"
import { useAuth } from "../../contexts/AuthContext"
import DashboardLayout from "../../components/dashboard/DashboardLayout"
import { Briefcase, Bell, Bookmark, Clock } from "lucide-react"

const CandidateDashboard = () => {
  const { currentUser } = useAuth()
  const { getApplicationsByCandidate, jobs } = useJob()
  const [stats, setStats] = useState({
    appliedJobs: 0,
    alerts: 0,
    shortlisted: 0,
  })
  const [recentApplications, setRecentApplications] = useState([])

  useEffect(() => {
    if (currentUser) {
      const applications = getApplicationsByCandidate(currentUser.id)
      setStats({
        appliedJobs: applications.length,
        alerts: 3, // Mock data
        shortlisted: 5, // Mock data
      })
      
      // Get recent applications
      const recent = applications
        .slice(0, 3)
        .map(app => ({
          ...app,
          job: jobs.find(j => j.id === app.jobId)
        }))
      setRecentApplications(recent)
    }
  }, [currentUser, getApplicationsByCandidate, jobs])

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, {currentUser?.name}!</h1>
          <p className="mt-2 text-gray-600">Here's what's happening with your job search</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link 
            to="/candidate/applied-jobs"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Briefcase className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Applied Jobs</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.appliedJobs}</p>
              </div>
            </div>
          </Link>

          <Link 
            to="/candidate/job-alerts"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <Bell className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Job Alerts</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.alerts}</p>
              </div>
            </div>
          </Link>

          <Link 
            to="/candidate/shortlisted-jobs"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Bookmark className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Shortlisted</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.shortlisted}</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Recent Applications */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Applications</h2>
            <Link 
              to="/candidate/applied-jobs"
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              View All
            </Link>
          </div>
          
          <div className="space-y-4">
            {recentApplications.map((application) => (
              <div 
                key={application.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-gray-100 rounded">
                    <Briefcase className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{application.job?.title}</h3>
                    <p className="text-sm text-gray-500">{application.job?.employerName}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>Applied {new Date(application.appliedAt).toLocaleDateString()}</span>
                  </div>
                  <Link
                    to={`/jobs/${application.jobId}`}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default CandidateDashboard