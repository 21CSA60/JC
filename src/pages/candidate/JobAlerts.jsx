import { useState, useEffect } from "react"
import DashboardLayout from "../../components/dashboard/DashboardLayout"
import { useAuth } from "../../contexts/AuthContext"
import { Bell, Plus, Edit2, Trash2, Save } from "lucide-react"

const JobAlerts = () => {
  const { currentUser } = useAuth()
  const [alerts, setAlerts] = useState([])
  const [isCreating, setIsCreating] = useState(false)
  const [editingAlert, setEditingAlert] = useState(null)
  const [formData, setFormData] = useState({
    title: "",
    keywords: "",
    location: "",
    jobType: "",
    salary: "",
    frequency: "daily",
  })

  useEffect(() => {
    // Load alerts from user profile or context
    setAlerts(currentUser?.jobAlerts || [])
  }, [currentUser])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newAlert = {
      id: editingAlert?.id || Date.now(),
      ...formData,
      createdAt: editingAlert?.createdAt || new Date().toISOString(),
    }

    if (editingAlert) {
      setAlerts(prev => prev.map(alert => 
        alert.id === editingAlert.id ? newAlert : alert
      ))
    } else {
      setAlerts(prev => [...prev, newAlert])
    }

    resetForm()
  }

  const handleEdit = (alert) => {
    setFormData(alert)
    setEditingAlert(alert)
    setIsCreating(true)
  }

  const handleDelete = (alertId) => {
    if (window.confirm("Are you sure you want to delete this alert?")) {
      setAlerts(prev => prev.filter(alert => alert.id !== alertId))
    }
  }

  const resetForm = () => {
    setFormData({
      title: "",
      keywords: "",
      location: "",
      jobType: "",
      salary: "",
      frequency: "daily",
    })
    setEditingAlert(null)
    setIsCreating(false)
  }

  const frequencies = [
    { value: "realtime", label: "Real-time" },
    { value: "daily", label: "Daily" },
    { value: "weekly", label: "Weekly" },
    { value: "monthly", label: "Monthly" },
  ]

  const jobTypes = [
    "Full-time",
    "Part-time",
    "Contract",
    "Temporary",
    "Internship",
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="bg-white shadow-md rounded-lg">
          <div className="p-6 border-b">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Job Alerts</h2>
                <p className="mt-1 text-sm text-gray-600">
                  Get notified when new jobs match your criteria
                </p>
              </div>
              {!isCreating && (
                <button
                  onClick={() => setIsCreating(true)}
                  className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Alert
                </button>
              )}
            </div>
          </div>

          {/* Create/Edit Alert Form */}
          {isCreating && (
            <div className="p-6 border-b bg-gray-50">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Alert Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="e.g., Senior Developer Jobs in New York"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Keywords
                    </label>
                    <input
                      type="text"
                      name="keywords"
                      value={formData.keywords}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="e.g., React, Node.js, JavaScript"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="e.g., New York, NY"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Job Type
                    </label>
                    <select
                      name="jobType"
                      value={formData.jobType}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="">Any Job Type</option>
                      {jobTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Salary Range
                    </label>
                    <input
                      type="text"
                      name="salary"
                      value={formData.salary}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="e.g., $50,000 - $80,000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Alert Frequency
                    </label>
                    <select
                      name="frequency"
                      value={formData.frequency}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      {frequencies.map(freq => (
                        <option key={freq.value} value={freq.value}>
                          {freq.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {editingAlert ? "Update Alert" : "Create Alert"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Alerts List */}
          <div className="p-6">
            <div className="space-y-4">
              {alerts.length === 0 ? (
                <div className="text-center py-8">
                  <Bell className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No alerts</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Create an alert to get notified about new jobs
                  </p>
                  {!isCreating && (
                    <button
                      onClick={() => setIsCreating(true)}
                      className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Create Alert
                    </button>
                  )}
                </div>
              ) : (
                alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="space-y-1">
                      <h3 className="text-sm font-medium text-gray-900">
                        {alert.title}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        {alert.keywords && (
                          <span>Keywords: {alert.keywords}</span>
                        )}
                        {alert.location && (
                          <span>Location: {alert.location}</span>
                        )}
                        <span>Frequency: {alert.frequency}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEdit(alert)}
                        className="p-2 text-blue-600 hover:text-blue-700"
                      >
                        <Edit2 className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(alert.id)}
                        className="p-2 text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default JobAlerts