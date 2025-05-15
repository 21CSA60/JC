import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useJob } from "../../contexts/JobContext"
import { useAuth } from "../../contexts/AuthContext"
import DashboardLayout from "../../components/dashboard/DashboardLayout"
import { Briefcase, Users, FileSearch, Clock, Building } from "lucide-react"

const EmployerDashboard = () => {
  const { currentUser } = useAuth()
  const { jobs, applications, getJobsByEmployer, getApplicationsByJob } = useJob()
  const [stats, setStats] = useState({
    postedJobs: 0,
    totalApplications: 0,
    shortlistedCandidates: 0,
  })
  const [recentApplicants, setRecentApplicants] = useState([])

  useEffect(() => {
    if (currentUser) {
      const employerJobs = getJobsByEmployer(currentUser.id)
      const allApplications = employerJobs.flatMap(job => getApplicationsByJob(job.id))
      const shortlisted = allApplications.filter(app => app.status === "Shortlisted")

      setStats({
        postedJobs: employerJobs.length,
        totalApplications: allApplications.length,
        shortlistedCandidates: shortlisted.length,
      })

      // Get recent applicants
      const recent = allApplications
        .slice(0, 5)
        .map(app => ({
          ...app,
          job: jobs.find(j => j.id === app.jobId)
        }))
      setRecentApplicants(recent)
    }
  }, [currentUser, jobs, getJobsByEmployer, getApplicationsByJob])

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, {currentUser?.name}!</h1>
          <p className="mt-2 text-gray-600">Here's an overview of your recruitment activity</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link 
            to="/employer/manage-jobs"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Briefcase className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Posted Jobs</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.postedJobs}</p>
              </div>
            </div>
          </Link>

          <Link 
            to="/employer/all-applicants"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Applications</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.totalApplications}</p>
              </div>
            </div>
          </Link>

          <Link 
            to="/employer/shortlisted-candidates"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg">
                <FileSearch className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Shortlisted</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.shortlistedCandidates}</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Recent Applicants */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Applicants</h2>
            <Link 
              to="/employer/all-applicants"
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              View All
            </Link>
          </div>
          
          <div className="space-y-4">
            {recentApplicants.map((applicant) => (
              <div 
                key={applicant.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-gray-100 rounded-full">
                    {applicant.profileImage ? (
                      <img
                        src={applicant.profileImage}
                        alt={applicant.candidateName}
                        className="h-10 w-10 rounded-full"
                      />
                    ) : (
                      <Users className="h-5 w-5 text-gray-600" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{applicant.candidateName}</h3>
                    <p className="text-sm text-gray-500">Applied for {applicant.job?.title}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{new Date(applicant.appliedAt).toLocaleDateString()}</span>
                  </div>
                  <Link
                    to={`/employer/review/${applicant.id}`}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    Review
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            to="/employer/create-job"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-center justify-between"
          >
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Briefcase className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <h3 className="font-medium text-gray-900">Post a New Job</h3>
                <p className="text-sm text-gray-500">Create a new job listing</p>
              </div>
            </div>
          </Link>

          <Link
            to="/employer/resume-alerts"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-center justify-between"
          >
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <Building className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <h3 className="font-medium text-gray-900">Manage Resume Alerts</h3>
                <p className="text-sm text-gray-500">Set up alerts for matching candidates</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default EmployerDashboard