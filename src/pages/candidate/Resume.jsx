import { useState } from "react"
import { useAuth } from "../../contexts/AuthContext"
import DashboardLayout from "../../components/dashboard/DashboardLayout"
import { File, Upload, Download, Trash2, Eye, AlertCircle } from "lucide-react"

const Resume = () => {
  const { currentUser, updateProfile } = useAuth()
  const [resumes, setResumes] = useState(currentUser?.resumes || [])
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState("")
  const [viewingResume, setViewingResume] = useState(null)

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const files = Array.from(e.dataTransfer.files)
    handleFiles(files)
  }

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files)
    handleFiles(files)
  }

  const handleFiles = (files) => {
    const allowedTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]
    const maxSize = 5 * 1024 * 1024 // 5MB

    const invalidFiles = files.filter(
      file => !allowedTypes.includes(file.type) || file.size > maxSize
    )

    if (invalidFiles.length > 0) {
      setError("Only PDF and Word documents under 5MB are allowed")
      return
    }

    files.forEach(file => {
      const reader = new FileReader()
      reader.onloadend = () => {
        const newResume = {
          id: Date.now(),
          name: file.name,
          type: file.type,
          size: file.size,
          data: reader.result,
          uploadDate: new Date().toISOString(),
          isDefault: resumes.length === 0,
        }
        setResumes(prev => [...prev, newResume])
      }
      reader.readAsDataURL(file)
    })
  }

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this resume?")) {
      setResumes(prev => prev.filter(resume => resume.id !== id))
    }
  }

  const handleSetDefault = (id) => {
    setResumes(prev =>
      prev.map(resume => ({
        ...resume,
        isDefault: resume.id === id,
      }))
    )
  }

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + " B"
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB"
    else return (bytes / 1048576).toFixed(1) + " MB"
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="bg-white shadow-md rounded-lg">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-900">Resume Management</h2>
            <p className="mt-1 text-sm text-gray-600">
              Upload and manage your resumes. Supported formats: PDF, DOC, DOCX (Max 5MB)
            </p>
          </div>

          {/* Upload Area */}
          <div className="p-6">
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center ${
                isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <Upload className="h-12 w-12 mx-auto text-gray-400" />
              <p className="mt-2 text-sm text-gray-600">
                Drag and drop your resume here, or
                <label className="mx-1 text-blue-600 hover:text-blue-500 cursor-pointer">
                  browse
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileSelect}
                    multiple
                  />
                </label>
                to upload
              </p>
            </div>

            {error && (
              <div className="mt-4 p-4 bg-red-50 rounded-md flex items-start">
                <AlertCircle className="h-5 w-5 text-red-400 mt-0.5" />
                <p className="ml-3 text-sm text-red-700">{error}</p>
              </div>
            )}
          </div>

          {/* Resumes List */}
          <div className="p-6 border-t">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Your Resumes</h3>
            <div className="space-y-4">
              {resumes.map((resume) => (
                <div
                  key={resume.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-gray-100 rounded">
                      <File className="h-6 w-6 text-gray-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{resume.name}</h4>
                      <p className="text-sm text-gray-500">
                        {formatFileSize(resume.size)} • Uploaded {formatDate(resume.uploadDate)}
                      </p>
                    </div>
                    {resume.isDefault && (
                      <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Default
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setViewingResume(resume)}
                      className="p-2 text-gray-400 hover:text-gray-500"
                      title="View Resume"
                    >
                      <Eye className="h-5 w-5" />
                    </button>
                    <a
                      href={resume.data}
                      download={resume.name}
                      className="p-2 text-gray-400 hover:text-gray-500"
                      title="Download Resume"
                    >
                      <Download className="h-5 w-5" />
                    </a>
                    {!resume.isDefault && (
                      <button
                        onClick={() => handleSetDefault(resume.id)}
                        className="px-3 py-1 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md"
                      >
                        Set as Default
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(resume.id)}
                      className="p-2 text-red-400 hover:text-red-500"
                      title="Delete Resume"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}

              {resumes.length === 0 && (
                <p className="text-center text-gray-500 py-8">
                  You haven't uploaded any resumes yet
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Resume Preview Modal */}
        {viewingResume && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
              <div className="p-4 border-b flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">
                  {viewingResume.name}
                </h3>
                <button
                  onClick={() => setViewingResume(null)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Close</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="flex-1 p-4 overflow-auto">
                <iframe
                  src={viewingResume.data}
                  className="w-full h-full"
                  title="Resume Preview"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

export default Resume