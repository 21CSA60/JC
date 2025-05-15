"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { useJob } from "../../contexts/JobContext"
import { User, Briefcase, CheckCircle, XCircle, ExternalLink, AlertCircle } from "lucide-react"

const CandidateReview = () => {
  const { jobId } = useParams()
  const navigate = useNavigate()
  const { getJobDetails, jobDetails } = useJob()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchJobDetails = async () => {
      setLoading(true)
      await getJobDetails(jobId)
      setLoading(false)
    }

    fetchJobDetails()
  }, [jobId, getJobDetails])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!jobDetails) {
    return (
      <div>
        <AlertCircle className="text-red-500" />
        <p>Job details not found.</p>
        <Link to="/jobs">Go back to jobs</Link>
      </div>
    )
  }

  return (
    <div>
      <h1>Review Candidates for {jobDetails.title}</h1>
      <div>
        {jobDetails.candidates.map((candidate) => (
          <div key={candidate.id} className="candidate-card">
            <User className="icon" />
            <p>{candidate.name}</p>
            <p>{candidate.email}</p>
            <div>
              <button onClick={() => navigate(`/candidate/${candidate.id}`)}>
                <ExternalLink className="icon" /> View Profile
              </button>
              <button>
                <CheckCircle className="icon" /> Approve
              </button>
              <button>
                <XCircle className="icon" /> Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CandidateReview