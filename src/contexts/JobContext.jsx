"use client"

import { createContext, useContext, useState } from "react";

const mockJobs = [
  {
    id: "1",
    title: "Software Engineer",
    company: "Tech Corp",
    employerId: "1",
    employerName: "Tech Corp",
    location: "New York",
    jobType: "Full-time",
    salary: "$100,000-$130,000",
    description: "Looking for a skilled software engineer...",
    requirements: ["React", "Node.js", "3+ years experience"],
    createdAt: new Date().toISOString(),
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    status: "active"
  },
  {
    id: "2",
    title: "Product Manager",
    company: "Digital Solutions",
    employerId: "1",
    employerName: "Digital Solutions",
    location: "San Francisco",
    jobType: "Full-time",
    salary: "$120,000-$150,000",
    description: "Experienced product manager needed...",
    requirements: ["5+ years experience", "Agile", "Tech background"],
    createdAt: new Date().toISOString(),
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    status: "active"
  }
];

const mockApplications = [
  {
    id: "1",
    jobId: "1",
    candidateId: "1",
    status: "pending",
    appliedAt: new Date().toISOString(),
    candidate: {
      name: "John Doe",
      email: "john@example.com",
      phone: "+1234567890",
      experience: "5 years",
      education: "Bachelor's in Computer Science",
      skills: "React, Node.js, JavaScript"
    },
    coverLetter: "I am excited to apply for this position...",
    resumeUrl: "#"
  }
];

const JobContext = createContext();

export function useJob() {
  return useContext(JobContext);
}

export function JobProvider({ children }) {
  const [jobs, setJobs] = useState(mockJobs);
  const [applications, setApplications] = useState(mockApplications);

  const getJobs = () => jobs;

  const getJobById = (id) => jobs.find(job => job.id === id);

  const getJobsByEmployer = (employerId) => 
    jobs.filter(job => job.employerId === employerId);

  const addJob = (newJob) => {
    const jobWithId = { ...newJob, id: (jobs.length + 1).toString() };
    setJobs([...jobs, jobWithId]);
    return jobWithId;
  };

  const updateJob = (id, updatedJob) => {
    setJobs(jobs.map(job => job.id === id ? { ...job, ...updatedJob } : job));
  };

  const deleteJob = (id) => {
    setJobs(jobs.filter(job => job.id !== id));
  };

  const getApplicationsByJob = (jobId) => {
    return applications.filter(app => app.jobId === jobId);
  };

  const getApplicationsByCandidate = (candidateId) => {
    return applications.filter(app => app.candidateId === candidateId);
  };

  const updateApplicationStatus = (applicationId, status) => {
    setApplications(applications.map(app => 
      app.id === applicationId ? { ...app, status } : app
    ));
    return Promise.resolve();
  };

  const applyToJob = (jobId, candidateData) => {
    const newApplication = {
      id: (applications.length + 1).toString(),
      jobId,
      candidateId: candidateData.id,
      status: "pending",
      appliedAt: new Date().toISOString(),
      candidate: candidateData,
      coverLetter: candidateData.coverLetter,
      resumeUrl: candidateData.resumeUrl
    };
    setApplications([...applications, newApplication]);
    return Promise.resolve(newApplication);
  };

  const withdrawApplication = (applicationId) => {
    setApplications(applications.filter(app => app.id !== applicationId));
    return Promise.resolve();
  };

  const value = {
    jobs,
    applications,
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
  };

  return (
    <JobContext.Provider value={value}>
      {children}
    </JobContext.Provider>
  );
}
