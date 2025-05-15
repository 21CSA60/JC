import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext"
import { JobProvider } from "./contexts/JobContext"
import ProtectedRoute from "./components/common/ProtectedRoute"

// Pages
import Home from "./pages/Home"
import AllJobs from "./pages/AllJobs"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import JobDetails from "./pages/JobDetails"
import JobApply from "./pages/candidate/JobApply"
import CandidateReview from "./pages/employer/CandidateReview"

// Candidate Pages
import CandidateDashboard from "./pages/candidate/CandidateDashboard"
import CandidateProfile from "./pages/candidate/CandidateProfile"
import Resume from "./pages/candidate/Resume"
import AppliedJobs from "./pages/candidate/AppliedJobs"
import JobAlerts from "./pages/candidate/JobAlerts"
import ShortlistedJobs from "./pages/candidate/ShortlistedJobs"

// Employer Pages
import EmployerDashboard from "./pages/employer/EmployerDashboard"
import EmployerProfile from "./pages/employer/EmployerProfile"
import PostJob from "./pages/employer/PostJob"
import ManageJobs from "./pages/employer/ManageJobs"
import Applications from "./pages/employer/Applications"
import ShortlistedCandidates from "./pages/employer/ShortlistedCandidates"
import ResumeAlerts from "./pages/employer/ResumeAlerts"
import ShortlistedResumes from "./pages/employer/ShortlistedResumes"

// Common Components
import ChangePassword from "./components/dashboard/ChangePassword"
import ViewProfile from "./pages/common/ViewProfile"
import DeleteProfile from "./pages/common/DeleteProfile"
import Layout from "./components/layout/Layout"

function App() {
  return (
    <Router>
      <AuthProvider>
        <JobProvider>
          <Layout>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/jobs" element={<AllJobs />} />
              <Route path="/jobs/:id" element={<JobDetails />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              {/* Public Profile Routes */}
              <Route path="/profile/:id" element={<ViewProfile />} />

              {/* Candidate Routes */}
              <Route
                path="/candidate/dashboard"
                element={
                  <ProtectedRoute allowedRoles={["candidate"]}>
                    <CandidateDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/candidate/profile"
                element={
                  <ProtectedRoute allowedRoles={["candidate"]}>
                    <CandidateProfile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/candidate/resume"
                element={
                  <ProtectedRoute allowedRoles={["candidate"]}>
                    <Resume />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/candidate/applied-jobs"
                element={
                  <ProtectedRoute allowedRoles={["candidate"]}>
                    <AppliedJobs />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/candidate/job-alerts"
                element={
                  <ProtectedRoute allowedRoles={["candidate"]}>
                    <JobAlerts />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/candidate/shortlisted-jobs"
                element={
                  <ProtectedRoute allowedRoles={["candidate"]}>
                    <ShortlistedJobs />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/candidate/change-password"
                element={
                  <ProtectedRoute allowedRoles={["candidate"]}>
                    <ChangePassword userRole="candidate" />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/candidate/view-profile"
                element={
                  <ProtectedRoute allowedRoles={["candidate"]}>
                    <ViewProfile userRole="candidate" />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/candidate/delete-profile"
                element={
                  <ProtectedRoute allowedRoles={["candidate"]}>
                    <DeleteProfile userRole="candidate" />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/jobs/:id/apply"
                element={
                  <ProtectedRoute allowedRoles={["candidate"]}>
                    <JobApply />
                  </ProtectedRoute>
                }
              />

              {/* Employer Routes */}
              <Route
                path="/employer/dashboard"
                element={
                  <ProtectedRoute allowedRoles={["employer"]}>
                    <EmployerDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/employer/profile"
                element={
                  <ProtectedRoute allowedRoles={["employer"]}>
                    <EmployerProfile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/employer/create-job"
                element={
                  <ProtectedRoute allowedRoles={["employer"]}>
                    <PostJob />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/employer/manage-jobs"
                element={
                  <ProtectedRoute allowedRoles={["employer"]}>
                    <ManageJobs />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/employer/all-applicants"
                element={
                  <ProtectedRoute allowedRoles={["employer"]}>
                    <Applications />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/employer/shortlisted-candidates"
                element={
                  <ProtectedRoute allowedRoles={["employer"]}>
                    <ShortlistedCandidates />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/employer/shortlisted-resumes"
                element={
                  <ProtectedRoute allowedRoles={["employer"]}>
                    <ShortlistedResumes />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/employer/resume-alerts"
                element={
                  <ProtectedRoute allowedRoles={["employer"]}>
                    <ResumeAlerts />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/employer/change-password"
                element={
                  <ProtectedRoute allowedRoles={["employer"]}>
                    <ChangePassword userRole="employer" />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/employer/view-profile"
                element={
                  <ProtectedRoute allowedRoles={["employer"]}>
                    <ViewProfile userRole="employer" />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/employer/delete-profile"
                element={
                  <ProtectedRoute allowedRoles={["employer"]}>
                    <DeleteProfile userRole="employer" />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/employer/candidates/:id/review"
                element={
                  <ProtectedRoute allowedRoles={["employer"]}>
                    <CandidateReview />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Layout>
        </JobProvider>
      </AuthProvider>
    </Router>
  )
}

export default App
