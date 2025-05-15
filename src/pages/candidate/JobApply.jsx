"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { useJob } from "../../contexts/JobContext"
import { useAuth } from "../../contexts/AuthContext"
import { Briefcase, Upload, AlertCircle } from "lucide-react"

const JobApply = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getJobById, applyForJob, loading } = useJob()
  const { currentUser } = useAuth()

  const [job, setJob] = useState(null)
  const [answers, setAnswers] = useState([])
  const [resumeFile, setResumeFile] = useState(null)
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (id) {
      const jobData = getJobById(id)
      setJob(jobData)

      // Initialize answers array based on questions
      if (jobData && jobData.questions) {
        setAnswers(Array(jobData.questions.length).fill(""))
      }
    }
  }, [id, getJobById])

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers]
    newAnswers[index] = value
    setAnswers(newAnswers)
  }

  const handleResumeChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        setError("Resume file size should be less than 5MB")
        return
      }
      setResumeFile(file)
      setError("")
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    // Validate all questions are answered
    if (job.questions && job.questions.length > 0) {
      const unansweredQuestions = answers.some((answer) => !answer.trim())
      if (unansweredQuestions) {
        setError("Please answer all questions")
        return
      }
    }

    // Validate resume is uploaded
    if (!resumeFile) {
      setError("Please upload your resume")
      return
    }

    try {
      setIsSubmitting(true)

      // In a real app, we would upload the resume to a storage service
      // and get a URL back. For this demo, we'll create a fake URL.
      const resumeUrl = `https://example.com/resumes/${currentUser.id}_${Date.now()}.pdf`

      await applyForJob(id, {
        resumeUrl,
        answers,
      })

      navigate("/candidate/dashboard", {
        state: { success: true, message: "Application submitted successfully!" },
      })
    } catch (err) {
      setError("Failed to submit application. Please try again.")
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading || !job) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center py-12">Loading job details...</div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <Link to={`/jobs/${id}`} className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
          &larr; Back to Job Details
        </Link>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="bg-blue-600 text-white p-6">
          <div className="flex items-center">
            <Briefcase className="h-8 w-8 mr-3" />
            <div>
              <h1 className="text-2xl font-bold">Apply for {job.title}</h1>
              <p className="text-blue-100">{job.employerName}</p>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 m-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-red-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Upload Your Resume</h2>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="resume-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="resume-upload"
                      name="resume-upload"
                      type="file"
                      className="sr-only"
                      accept=".pdf,.doc,.docx"
                      onChange={handleResumeChange}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PDF, DOC, or DOCX up to 5MB</p>
                {resumeFile && <p className="text-sm text-green-600 mt-2">Selected file: {resumeFile.name}</p>}
              </div>
            </div>
          </div>

          {job.questions && job.questions.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Additional Questions</h2>
              <div className="space-y-6">
                {job.questions.map((question, index) => (
                  <div key={index}>
                    <label htmlFor={`question-${index}`} className="block text-sm font-medium text-gray-700">
                      {question}
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id={`question-${index}`}
                        value={answers[index] || ""}
                        onChange={(e) => handleAnswerChange(index, e.target.value)}
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end">
            <Link
              to={`/jobs/${id}`}
              className="mr-4 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default JobApply