import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useJob } from "../../contexts/JobContext"
import { useAuth } from "../../contexts/AuthContext"
import DashboardLayout from "../../components/dashboard/DashboardLayout"
import { Edit2, Trash2, Eye, Calendar, MapPin, Users, Clock } from "lucide-react"

const ManageJobs = () => {
  const { currentUser } = useAuth()
  const { getJobsByEmployer, deleteJob } = useJob()
  const [jobs, setJobs] = useState([])
  const [timeFilter, setTimeFilter] = useState("all")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadJobs()
  }, [currentUser])

  const loadJobs = async () => {
    setIsLoading(true)
    try {
      const employerJobs = await getJobsByEmployer(currentUser.id)
      setJobs(employerJobs)
    } catch (error) {
      console.error("Failed to load jobs:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteJob = async (jobId) => {
    if (window.confirm("Are you sure you want to delete this job listing?")) {
      try {
        await deleteJob(jobId)
        setJobs(prev => prev.filter(job => job.id !== jobId))
      } catch (error) {
        console.error("Failed to delete job:", error)
      }
    }
  }

  const filterJobs = () => {
    if (timeFilter === "all") return jobs

    const now = new Date()
    const thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30))

    switch (timeFilter) {
      case "active":
        return jobs.filter(job => new Date(job.deadline) > new Date())
      case "expired":
        return jobs.filter(job => new Date(job.deadline) <= new Date())
      case "last30days":
        return jobs.filter(job => new Date(job.createdAt) > thirtyDaysAgo)
      default:
        return jobs
    }
  }

  const getStatusBadgeColor = (deadline) => {
    const now = new Date()
    const jobDeadline = new Date(deadline)
    
    if (jobDeadline < now) {
      return "bg-red-100 text-red-800"
    }
    const daysLeft = Math.ceil((jobDeadline - now) / (1000 * 60 * 60 * 24))
    if (daysLeft <= 3) {
      return "bg-yellow-100 text-yellow-800"
    }
    return "bg-green-100 text-green-800"
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white shadow-md rounded-lg">
          <div className="p-6 border-b">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Manage Jobs</h2>
                <p className="mt-1 text-sm text-gray-600">
                  View and manage all your job listings
                </p>
              </div>
              <Link
                to="/employer/create-job"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Post New Job
              </Link>
            </div>
          </div>

          {/* Filters */}
          <div className="p-4 border-b bg-gray-50">
            <div className="flex space-x-4">
              <select
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="all">All Jobs</option>
                <option value="active">Active Jobs</option>
                <option value="expired">Expired Jobs</option>
                <option value="last30days">Last 30 Days</option>
              </select>
            </div>
          </div>
        </div>

        {/* Jobs List */}
        <div className="space-y-4">
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading jobs...</p>
            </div>
          ) : filterJobs().length === 0 ? (
            <div className="text-center py-8 bg-white rounded-lg shadow-md">
              <p className="text-gray-600">No jobs found</p>
            </div>
          ) : (
            filterJobs().map((job) => (
              <div
                key={job.id}
                className="bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium text-gray-900">
                        {job.title}
                      </h3>
                      <div className="flex items-center text-sm text-gray-500 space-x-4">
                        <span className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {job.location}
                        </span>
                        <span className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          {job.applications?.length || 0} Applications
                        </span>
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          Posted {formatDate(job.createdAt)}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Link
                        to={`/jobs/${job.id}`}
                        className="p-2 text-gray-400 hover:text-gray-500"
                        title="View Job"
                      >
                        <Eye className="h-5 w-5" />
                      </Link>
                      <Link
                        to={`/employer/edit-job/${job.id}`}
                        className="p-2 text-blue-400 hover:text-blue-500"
                        title="Edit Job"
                      >
                        <Edit2 className="h-5 w-5" />
                      </Link>
                      <button
                        onClick={() => handleDeleteJob(job.id)}
                        className="p-2 text-red-400 hover:text-red-500"
                        title="Delete Job"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        getStatusBadgeColor(job.deadline)
                      }`}>
                        <Clock className="h-3 w-3 mr-1" />
                        Deadline: {formatDate(job.deadline)}
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {job.jobType}
                      </span>
                      <span className="text-sm text-gray-500">
                        {job.salaryRange}
                      </span>
                    </div>
                    <Link
                      to={`/employer/applications/${job.id}`}
                      className="text-sm text-blue-600 hover:text-blue-700"
                    >
                      View Applications →
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}

export default ManageJobs