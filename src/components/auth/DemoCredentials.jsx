import { Link } from "react-router-dom"
import { User, Building } from "lucide-react"

const DemoCredentials = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Demo Accounts</h2>
      <p className="text-sm text-gray-600 mb-6">
        Use these credentials to test different user roles (any password will work):
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Candidate Account */}
        <div className="border rounded-lg p-4 bg-blue-50">
          <div className="flex items-center mb-3">
            <User className="h-5 w-5 text-blue-600 mr-2" />
            <h3 className="font-medium text-blue-900">Candidate Account</h3>
          </div>
          <div className="space-y-2">
            <p className="text-sm">
              <span className="font-medium text-gray-700">Email:</span>{" "}
              <code className="bg-blue-100 px-2 py-1 rounded">candidate@example.com</code>
            </p>
            <p className="text-sm">
              <span className="font-medium text-gray-700">Password:</span>{" "}
              <span className="text-gray-600">Any password will work</span>
            </p>
            <p className="text-sm text-gray-600">Access to job search and application features</p>
          </div>
          <Link
            to="/login"
            className="mt-4 inline-block text-sm text-blue-600 hover:text-blue-800"
          >
            Login as Candidate →
          </Link>
        </div>

        {/* Employer Account */}
        <div className="border rounded-lg p-4 bg-green-50">
          <div className="flex items-center mb-3">
            <Building className="h-5 w-5 text-green-600 mr-2" />
            <h3 className="font-medium text-green-900">Employer Account</h3>
          </div>
          <div className="space-y-2">
            <p className="text-sm">
              <span className="font-medium text-gray-700">Email:</span>{" "}
              <code className="bg-green-100 px-2 py-1 rounded">employer@example.com</code>
            </p>
            <p className="text-sm">
              <span className="font-medium text-gray-700">Password:</span>{" "}
              <span className="text-gray-600">Any password will work</span>
            </p>
            <p className="text-sm text-gray-600">Access to job posting and candidate management</p>
          </div>
          <Link
            to="/login"
            className="mt-4 inline-block text-sm text-green-600 hover:text-green-800"
          >
            Login as Employer →
          </Link>
        </div>
      </div>

      <div className="mt-6 text-center">
        <p className="text-xs text-gray-500">
          These are demo accounts for testing purposes only. Do not use real credentials.
        </p>
      </div>
    </div>
  )
}

export default DemoCredentials