import { Link } from "react-router-dom"
import { GraduationCap, Facebook, Twitter, Linkedin, Instagram, Youtube } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center">
              <GraduationCap className="h-8 w-8 text-blue-400" />
              <span className="ml-2 text-xl font-bold">JobConnect</span>
            </Link>
            <p className="mt-4 text-sm text-gray-300">
              Connecting talented professionals with their dream careers.
            </p>
            <div className="mt-6 flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="col-span-1">
            <h3 className="text-sm font-semibold uppercase tracking-wider">For Candidates</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/jobs" className="text-gray-300 hover:text-white text-sm">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link to="/candidate/dashboard" className="text-gray-300 hover:text-white text-sm">
                  Candidate Dashboard
                </Link>
              </li>
              <li>
                <Link to="/candidate/applied-jobs" className="text-gray-300 hover:text-white text-sm">
                  Applied Jobs
                </Link>
              </li>
              <li>
                <Link to="/candidate/job-alerts" className="text-gray-300 hover:text-white text-sm">
                  Job Alerts
                </Link>
              </li>
              <li>
                <Link to="/candidate/shortlisted-jobs" className="text-gray-300 hover:text-white text-sm">
                  Shortlisted Jobs
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="text-sm font-semibold uppercase tracking-wider">For Employers</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/employer/dashboard" className="text-gray-300 hover:text-white text-sm">
                  Employer Dashboard
                </Link>
              </li>
              <li>
                <Link to="/employer/create-job" className="text-gray-300 hover:text-white text-sm">
                  Post a Job
                </Link>
              </li>
              <li>
                <Link to="/employer/manage-jobs" className="text-gray-300 hover:text-white text-sm">
                  Manage Jobs
                </Link>
              </li>
              <li>
                <Link to="/employer/shortlisted-resumes" className="text-gray-300 hover:text-white text-sm">
                  Shortlisted Resumes
                </Link>
              </li>
              <li>
                <Link to="/employer/resume-alerts" className="text-gray-300 hover:text-white text-sm">
                  Resume Alerts
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="text-sm font-semibold uppercase tracking-wider">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white text-sm">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-gray-300 hover:text-white text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-300 hover:text-white text-sm">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-700 pt-8">
          <p className="text-sm text-gray-400 text-center">
            &copy; {new Date().getFullYear()} JobConnect. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
