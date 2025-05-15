import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useJob } from "../../contexts/JobContext"
import { useAuth } from "../../contexts/AuthContext"
import DashboardLayout from "../../components/dashboard/DashboardLayout"
import { Building, Calendar, MapPin, Clock, XCircle } from "lucide-react"

const AppliedJobs = () => {
  const { currentUser } = useAuth()
  const { getApplicationsByCandidate, withdrawApplication, jobs } = useJob()
  const [applications, setApplications] = useState([])
  const [filterStatus, setFilterStatus] = useState("all")
  const [sortBy, setSortBy] = useState("date")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadApplications()
  }, [currentUser])

  const loadApplications = async () => {
    setIsLoading(true)
    try {
      const userApplications = await getApplicationsByCandidate(currentUser.id)
      const applicationsWithJobs = userApplications.map(app => ({
        ...app,
        job: jobs.find(j => j.id === app.jobId)
      }))
      setApplications(applicationsWithJobs)
    } catch (error) {
      console.error("Failed to load applications:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleWithdraw = async (applicationId) => {
    if (window.confirm("Are you sure you want to withdraw this application?")) {
      try {
        await withdrawApplication(applicationId)
        setApplications(prev => prev.filter(app => app.id !== applicationId))
      } catch (error) {
        console.error("Failed to withdraw application:", error)
      }
    }
  }

  const getStatusBadgeColor = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      case "shortlisted":
        return "bg-blue-100 text-blue-800"
      case "accepted":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredApplications = applications
    .filter(app => filterStatus === "all" || app.status.toLowerCase() === filterStatus)
    .sort((a, b) => {
      if (sortBy === "date") {
        return new Date(b.appliedAt) - new Date(a.appliedAt)
      }
      // Add more sorting options if needed
      return 0
    })

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric"
    })
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="bg-white shadow-md rounded-lg">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-900">Applied Jobs</h2>
            <p className="mt-1 text-sm text-gray-600">
              Track and manage your job applications
            </p>
          </div>

          {/* Filters */}
          <div className="p-4 border-b bg-gray-50">
            <div className="flex flex-wrap gap-4">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="all">All Applications</option>
                <option value="pending">Pending</option>
                <option value="shortlisted">Shortlisted</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="date">Sort by Date</option>
                {/* Add more sorting options if needed */}
              </select>
            </div>
          </div>
        </div>

        {/* Applications List */}
        <div className="space-y-4">
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading applications...</p>
            </div>
          ) : filteredApplications.length === 0 ? (
            <div className="text-center py-8 bg-white rounded-lg shadow-md">
              <p className="text-gray-600">No applications found</p>
              <Link
                to="/jobs"
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                Browse Jobs
              </Link>
            </div>
          ) : (
            filteredApplications.map((application) => (
              <div
                key={application.id}
                className="bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium text-gray-900">
                        {application.job?.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center">
                          <Building className="h-4 w-4 mr-1" />
                          {application.job?.employerName}
                        </span>
                        <span className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {application.job?.location}
                        </span>
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          Applied on {formatDate(application.appliedAt)}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        getStatusBadgeColor(application.status)
                      }`}>
                        {application.status}
                      </span>
                      {application.status === "Pending" && (
                        <button
                          onClick={() => handleWithdraw(application.id)}
                          className="p-2 text-red-400 hover:text-red-500"
                          title="Withdraw Application"
                        >
                          <XCircle className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 border-t pt-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-500">
                          {application.job?.jobType}
                        </span>
                        <span className="text-sm text-gray-500">
                          {application.job?.salaryRange}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center text-sm text-gray-500">
                          <Clock className="h-4 w-4 mr-1" />
                          Deadline: {formatDate(application.job?.deadline)}
                        </span>
                        <Link
                          to={`/jobs/${application.jobId}`}
                          className="text-sm text-blue-600 hover:text-blue-700"
                        >
                          View Job Details →
                        </Link>
                      </div>
                    </div>
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

export default AppliedJobs