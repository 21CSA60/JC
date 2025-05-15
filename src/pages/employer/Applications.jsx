import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useJob } from "../../contexts/JobContext"
import DashboardLayout from "../../components/dashboard/DashboardLayout"
import { Download, Mail, Phone, MapPin, Briefcase, Star, Users, CheckCircle, XCircle, Clock } from "lucide-react"

const Applications = () => {
  const { jobId } = useParams()
  const { getJobById, getApplicationsByJob, updateApplicationStatus } = useJob()
  const [job, setJob] = useState(null)
  const [applications, setApplications] = useState([])
  const [filter, setFilter] = useState("all")
  const [sortBy, setSortBy] = useState("date")
  const [viewingApplication, setViewingApplication] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [jobId])

  const loadData = async () => {
    setIsLoading(true)
    try {
      const jobData = await getJobById(jobId)
      const applicationsData = await getApplicationsByJob(jobId)
      setJob(jobData)
      setApplications(applicationsData)
    } catch (error) {
      console.error("Failed to load data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdateStatus = async (applicationId, newStatus) => {
    try {
      await updateApplicationStatus(applicationId, newStatus)
      setApplications(prev =>
        prev.map(app =>
          app.id === applicationId ? { ...app, status: newStatus } : app
        )
      )
    } catch (error) {
      console.error("Failed to update status:", error)
    }
  }

  const filteredApplications = applications
    .filter(app => filter === "all" || app.status.toLowerCase() === filter)
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

  const getStatusBadgeColor = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "shortlisted":
        return "bg-blue-100 text-blue-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      case "accepted":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Job Overview */}
        {job && (
          <div className="bg-white shadow-md rounded-lg">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900">{job.title}</h2>
              <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {job.location}
                </span>
                <span className="flex items-center">
                  <Briefcase className="h-4 w-4 mr-1" />
                  {job.jobType}
                </span>
                <span className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  {applications.length} Applications
                </span>
                <span className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  Deadline: {formatDate(job.deadline)}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="bg-white shadow-md rounded-lg">
          <div className="p-4 border-b">
            <div className="flex flex-wrap gap-4">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
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

          {/* Applications List */}
          <div className="p-6">
            <div className="space-y-6">
              {isLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-2 text-gray-600">Loading applications...</p>
                </div>
              ) : filteredApplications.length === 0 ? (
                <div className="text-center py-8">
                  <Users className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No applications</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    No applications match your current filters
                  </p>
                </div>
              ) : (
                filteredApplications.map((application) => (
                  <div
                    key={application.id}
                    className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="text-lg font-medium text-gray-900">
                            {application.candidate.name}
                          </h3>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            getStatusBadgeColor(application.status)
                          }`}>
                            {application.status}
                          </span>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className="flex items-center">
                            <Mail className="h-4 w-4 mr-1" />
                            {application.candidate.email}
                          </span>
                          {application.candidate.phone && (
                            <span className="flex items-center">
                              <Phone className="h-4 w-4 mr-1" />
                              {application.candidate.phone}
                            </span>
                          )}
                          <span className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            Applied {formatDate(application.appliedAt)}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <a
                          href={application.resumeUrl}
                          download
                          className="p-2 text-gray-400 hover:text-gray-500"
                          title="Download Resume"
                        >
                          <Download className="h-5 w-5" />
                        </a>
                        <button
                          onClick={() => setViewingApplication(application)}
                          className="px-3 py-1 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md"
                        >
                          View Details
                        </button>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="mt-4 flex items-center space-x-4">
                      {application.status === "pending" && (
                        <>
                          <button
                            onClick={() => handleUpdateStatus(application.id, "shortlisted")}
                            className="flex items-center px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-md"
                          >
                            <Star className="h-4 w-4 mr-1" />
                            Shortlist
                          </button>
                          <button
                            onClick={() => handleUpdateStatus(application.id, "rejected")}
                            className="flex items-center px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-md"
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Reject
                          </button>
                        </>
                      )}
                      {application.status === "shortlisted" && (
                        <button
                          onClick={() => handleUpdateStatus(application.id, "accepted")}
                          className="flex items-center px-3 py-1 text-sm text-green-600 hover:bg-green-50 rounded-md"
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Accept
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Application Details Modal */}
        {viewingApplication && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
              <div className="p-6 border-b flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Application Details
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {viewingApplication.candidate.name}'s application
                  </p>
                </div>
                <button
                  onClick={() => setViewingApplication(null)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Close</span>
                  <XCircle className="h-6 w-6" />
                </button>
              </div>
              <div className="p-6 overflow-y-auto">
                {/* Add detailed application view here */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Cover Letter</h4>
                    <p className="mt-2 text-sm text-gray-600 whitespace-pre-wrap">
                      {viewingApplication.coverLetter}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Skills</h4>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {viewingApplication.candidate.skills?.split(',').map((skill, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          {skill.trim()}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Experience</h4>
                    <p className="mt-2 text-sm text-gray-600 whitespace-pre-wrap">
                      {viewingApplication.candidate.experience}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Education</h4>
                    <p className="mt-2 text-sm text-gray-600 whitespace-pre-wrap">
                      {viewingApplication.candidate.education}
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-6 border-t bg-gray-50">
                <div className="flex justify-end space-x-4">
                  <a
                    href={viewingApplication.resumeUrl}
                    download
                    className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Resume
                  </a>
                  {viewingApplication.status === "pending" && (
                    <>
                      <button
                        onClick={() => {
                          handleUpdateStatus(viewingApplication.id, "shortlisted")
                          setViewingApplication(null)
                        }}
                        className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                      >
                        <Star className="h-4 w-4 mr-2" />
                        Shortlist Candidate
                      </button>
                      <button
                        onClick={() => {
                          handleUpdateStatus(viewingApplication.id, "rejected")
                          setViewingApplication(null)
                        }}
                        className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                      >
                        <XCircle className="h-4 w-4 mr-2" />
                        Reject Application
                      </button>
                    </>
                  )}
                  {viewingApplication.status === "shortlisted" && (
                    <button
                      onClick={() => {
                        handleUpdateStatus(viewingApplication.id, "accepted")
                        setViewingApplication(null)
                      }}
                      className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Accept Candidate
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

export default Applications