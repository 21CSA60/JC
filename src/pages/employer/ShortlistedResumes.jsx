import { useState, useEffect } from "react"
import { useJob } from "../../contexts/JobContext"
import DashboardLayout from "../../components/dashboard/DashboardLayout"
import { Star, Download, Phone, Mail, MapPin, Briefcase, Building, GraduationCap, Trash2, Calendar } from "lucide-react"

const ShortlistedResumes = () => {
  const { applications, getApplicationsByJob, jobs } = useJob()
  const [shortlistedCandidates, setShortlistedCandidates] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadShortlistedCandidates()
  }, [])

  const loadShortlistedCandidates = () => {
    // In a real app, this would be an API call
    // For now, filter applications with "shortlisted" status
    const shortlisted = applications.filter(app => app.status === "shortlisted")
      .map(app => ({
        ...app,
        job: jobs.find(job => job.id === app.jobId)
      }))
    setShortlistedCandidates(shortlisted)
    setIsLoading(false)
  }

  const handleRemoveFromShortlist = async (applicationId) => {
    try {
      // In a real app, make API call to update status
      setShortlistedCandidates(prev => 
        prev.filter(candidate => candidate.id !== applicationId)
      )
    } catch (error) {
      console.error("Failed to remove from shortlist:", error)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(undefined, {
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
            <div className="flex items-center">
              <Star className="h-6 w-6 text-yellow-500 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">Shortlisted Resumes</h2>
            </div>
            <p className="mt-1 text-sm text-gray-500">
              View and manage candidates you've shortlisted for various positions
            </p>
          </div>

          <div className="p-6">
            {isLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                <p className="mt-2 text-gray-500">Loading shortlisted candidates...</p>
              </div>
            ) : shortlistedCandidates.length === 0 ? (
              <div className="text-center py-8">
                <Star className="h-12 w-12 text-gray-400 mx-auto" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No shortlisted candidates</h3>
                <p className="mt-1 text-sm text-gray-500">
                  You haven't shortlisted any candidates yet
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {shortlistedCandidates.map((candidate) => (
                  <div key={candidate.id} className="bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <div className="p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">
                            {candidate.candidate.name}
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">
                            Applied for: {candidate.job?.title}
                          </p>
                        </div>
                        <button
                          onClick={() => handleRemoveFromShortlist(candidate.id)}
                          className="p-2 text-gray-400 hover:text-red-500"
                          title="Remove from shortlist"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-4">
                        <div className="flex items-center text-sm text-gray-500">
                          <Mail className="h-4 w-4 mr-1.5" />
                          {candidate.candidate.email}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Phone className="h-4 w-4 mr-1.5" />
                          {candidate.candidate.phone}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <GraduationCap className="h-4 w-4 mr-1.5" />
                          {candidate.candidate.education}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Briefcase className="h-4 w-4 mr-1.5" />
                          {candidate.candidate.experience}
                        </div>
                      </div>

                      <div className="mt-4 flex justify-between items-center">
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="h-4 w-4 mr-1.5" />
                          Shortlisted on: {formatDate(candidate.appliedAt)}
                        </div>
                        <a
                          href={candidate.resumeUrl}
                          download
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download Resume
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default ShortlistedResumes