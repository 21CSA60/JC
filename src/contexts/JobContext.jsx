import { createContext, useContext, useState, useCallback } from "react"
import { mockJobs, mockApplications } from "../data/mockData"

const JobContext = createContext()

export function useJob() {
  return useContext(JobContext)
}

export function JobProvider({ children }) {
  const [jobs, setJobs] = useState(mockJobs)
  const [applications, setApplications] = useState(mockApplications)
  const [loading, setLoading] = useState(false)

  const getJobs = useCallback(() => jobs, [jobs])

  const getJobById = useCallback((id) => 
    jobs.find(job => job.id === id)
  , [jobs])

  const getJobsByEmployer = useCallback((employerId) => 
    jobs.filter(job => job.employerId === employerId)
  , [jobs])

  const addJob = useCallback((newJob) => {
    const jobWithId = { 
      ...newJob, 
      id: (jobs.length + 1).toString(),
      createdAt: new Date().toISOString(),
      status: "active"
    }
    setJobs(prev => [...prev, jobWithId])
    return jobWithId
  }, [jobs])

  const updateJob = useCallback((id, updatedJob) => {
    setJobs(prev => prev.map(job => 
      job.id === id ? { ...job, ...updatedJob } : job
    ))
  }, [])

  const deleteJob = useCallback((id) => {
    setJobs(prev => prev.filter(job => job.id !== id))
    // Also delete related applications
    setApplications(prev => prev.filter(app => app.jobId !== id))
  }, [])

  const getApplicationsByJob = useCallback((jobId) => 
    applications.filter(app => app.jobId === jobId)
  , [applications])

  const getApplicationsByCandidate = useCallback((candidateId) => 
    applications.filter(app => app.candidateId === candidateId)
  , [applications])

  const updateApplicationStatus = useCallback((applicationId, status) => {
    setApplications(prev => prev.map(app => 
      app.id === applicationId ? { ...app, status } : app
    ))
    return Promise.resolve()
  }, [])

  const applyToJob = useCallback((jobId, candidateData) => {
    const newApplication = {
      id: (applications.length + 1).toString(),
      jobId,
      candidateId: candidateData.id,
      status: "pending",
      appliedAt: new Date().toISOString(),
      candidate: candidateData,
      coverLetter: candidateData.coverLetter,
      resumeUrl: candidateData.resumeUrl
    }
    setApplications(prev => [...prev, newApplication])
    return Promise.resolve(newApplication)
  }, [applications])

  const withdrawApplication = useCallback((applicationId) => {
    setApplications(prev => prev.filter(app => app.id !== applicationId))
    return Promise.resolve()
  }, [])

  const value = {
    jobs,
    applications,
    loading,
    getJobs,
    getJobById,
    getJobsByEmployer,
    addJob,
    updateJob,
    deleteJob,
    getApplicationsByJob,
    getApplicationsByCandidate,
    updateApplicationStatus,
    applyToJob,
    withdrawApplication
  }

  return (
    <JobContext.Provider value={value}>
      {children}
    </JobContext.Provider>
  )
}