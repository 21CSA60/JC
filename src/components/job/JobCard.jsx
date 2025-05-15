"use client"

import { Link } from "react-router-dom"
import { MapPin, Clock, DollarSign, Briefcase } from "lucide-react"
import { useAuth } from "../../contexts/AuthContext"

const JobCard = ({ job }) => {
  const { currentUser } = useAuth()

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{job.title}</h3>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {job.type}
          </span>
        </div>

        <p className="text-sm text-gray-500 mb-4">{job.employerName}</p>

        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="h-4 w-4 mr-1" />
            {job.location}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <DollarSign className="h-4 w-4 mr-1" />
            {job.salary}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="h-4 w-4 mr-1" />
            Posted {formatDate(job.createdAt)}
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{job.description}</p>

        <div className="flex justify-between items-center">
          <Link to={`/jobs/${job.id}`} className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            View Details
          </Link>

          {(!currentUser || currentUser.role === "candidate") && (
          <Link
            to={currentUser ? `/jobs/${job.id}/apply` : "/login"}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
          <Briefcase className="h-4 w-4 mr-2" />
           {currentUser ? "Apply Now" : "Login to Apply"}
          </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default JobCard