"use client"

import { useState, useEffect } from "react"
import { useJob } from "../contexts/JobContext"
import JobCard from "../components/job/JobCard"
import JobFilter from "../components/job/JobFilter"
import { Briefcase } from "lucide-react"

const AllJobs = () => {
  const { jobs, loading } = useJob()
  const [filteredJobs, setFilteredJobs] = useState([])
  const [activeFilters, setActiveFilters] = useState({
    search: "",
    jobType: "",
    location: "",
    salary: "",
  })

  useEffect(() => {
    setFilteredJobs(jobs)
  }, [jobs])

  const handleFilter = (filters) => {
    setActiveFilters(filters)

    let results = [...jobs]

    // Filter by search term
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase()
      results = results.filter(
        (job) =>
          job.title.toLowerCase().includes(searchTerm) ||
          job.description.toLowerCase().includes(searchTerm) ||
          job.employerName.toLowerCase().includes(searchTerm),
      )
    }

    // Filter by job type
    if (filters.jobType) {
      results = results.filter((job) => job.type === filters.jobType)
    }

    // Filter by location
    if (filters.location) {
      results = results.filter((job) => job.location === filters.location)
    }

    // Filter by salary range
    if (filters.salary) {
      const [min, max] = filters.salary.split("-").map(Number)

      if (max) {
        // For ranges like "50000-80000"
        results = results.filter((job) => {
          const jobSalary = Number.parseInt(job.salary.replace(/[^0-9]/g, ""))
          return jobSalary >= min && jobSalary <= max
        })
      } else if (filters.salary.includes("+")) {
        // For ranges like "150000+"
        const minSalary = Number.parseInt(filters.salary)
        results = results.filter((job) => {
          const jobSalary = Number.parseInt(job.salary.replace(/[^0-9]/g, ""))
          return jobSalary >= minSalary
        })
      }
    }

    setFilteredJobs(results)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-4">Browse All Jobs</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Find the perfect opportunity that matches your skills and experience
        </p>
      </div>

      <JobFilter onFilter={handleFilter} />

      {loading ? (
        <div className="text-center py-12">Loading jobs...</div>
      ) : filteredJobs.length > 0 ? (
        <div className="grid grid-cols-1 gap-6">
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
          <p className="text-gray-500">Try adjusting your search filters to find more opportunities.</p>
        </div>
      )}
    </div>
  )
}

export default AllJobs
