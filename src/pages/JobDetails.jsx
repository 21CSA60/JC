"use client"

import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { useJob } from "../contexts/JobContext"
import { useAuth } from "../contexts/AuthContext"
import { MapPin, DollarSign, Briefcase, Building, Calendar, Users } from "lucide-react"

const JobDetails = () => {
  const { id } = useParams()
  const { getJobById, loading } = useJob()
  const { currentUser } = useAuth()
  const [job, setJob] = useState(null)

  useEffect(() => {
    if (id) {
      const jobData = getJobById(id)
      setJob(jobData)
    }
  }, [id, getJobById])

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center py-12">Loading job details...</div>
      </div>
    )
  }

  if (!job) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Job Not Found</h2>
          <p className="text-gray-600 mb-6">The job you're looking for doesn't exist or has been removed.</p>
          <Link
            to="/jobs"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Browse All Jobs
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {/* Job Header */}
        <div className="bg-blue-600 text-white p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">{job.title}</h1>
              <div className="flex items-center text-blue-100">
                <Building className="h-5 w-5 mr-2" />
                {job.employerName}
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-800 text-white">
                {job.type}
              </span>
            </div>
          </div>
        </div>

        {/* Job Details */}
        <div className="p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="flex items-start">
              <MapPin className="h-6 w-6 text-gray-400 mr-3 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-gray-500">Location</h3>
                <p className="mt-1 text-base font-medium text-gray-900">{job.location}</p>
              </div>
            </div>

            <div className="flex items-start">
              <DollarSign className="h-6 w-6 text-gray-400 mr-3 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-gray-500">Salary</h3>
                <p className="mt-1 text-base font-medium text-gray-900">{job.salary}</p>
              </div>
            </div>

            <div className="flex items-start">
              <Calendar className="h-6 w-6 text-gray-400 mr-3 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-gray-500">Posted On</h3>
                <p className="mt-1 text-base font-medium text-gray-900">{formatDate(job.createdAt)}</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Job Description</h2>
            <div className="prose max-w-none text-gray-600">
              <p>{job.description}</p>
            </div>
          </div>

          {job.questions && job.questions.length > 0 && (
            <div className="border-t border-gray-200 pt-8 mt-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Candidate Questions</h2>
              <ul className="space-y-2">
                {job.questions.map((question, index) => (
                  <li key={index} className="flex items-start">
                    <span className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3 mt-0.5 text-sm font-medium">
                      {index + 1}
                    </span>
                    <span className="text-gray-700">{question}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="border-t border-gray-200 pt-8 mt-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center mb-4 sm:mb-0">
                <Users className="h-6 w-6 text-gray-400 mr-2" />
                <span className="text-gray-600">Be one of the first applicants</span>
              </div>

              {currentUser && currentUser.role === "candidate" ? (
                <Link
                  to={`/jobs/${job.id}/apply`}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Briefcase className="h-5 w-5 mr-2" />
                  Apply Now
                </Link>
              ) : !currentUser ? (
                <Link
                  to="/login"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Briefcase className="h-5 w-5 mr-2" />
                  Login to Apply
                </Link>
              ) : (
                <div className="text-gray-500 italic">Only candidates can apply for jobs</div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link
          to="/jobs"
          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Back to All Jobs
        </Link>
      </div>
    </div>
  )
}

export default JobDetails
