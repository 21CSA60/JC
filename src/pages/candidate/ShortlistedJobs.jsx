import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useJob } from "../../contexts/JobContext";
import { useAuth } from "../../contexts/AuthContext";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { Star, MapPin, Briefcase, DollarSign, Calendar, Trash2 } from "lucide-react";

const ShortlistedJobs = () => {
  const { currentUser } = useAuth();
  const { jobs } = useJob();
  const [shortlistedJobs, setShortlistedJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadShortlistedJobs();
  }, [currentUser]);

  const loadShortlistedJobs = () => {
    // In a real app, this would be an API call
    // For now, we'll simulate with local data
    setShortlistedJobs(
      jobs.filter(job => currentUser?.shortlistedJobs?.includes(job.id))
    );
    setIsLoading(false);
  };

  const handleRemoveFromShortlist = (jobId) => {
    // In a real app, make API call to remove from shortlist
    setShortlistedJobs(prev => prev.filter(job => job.id !== jobId));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="bg-white shadow-md rounded-lg">
          <div className="p-6 border-b">
            <div className="flex items-center">
              <Star className="h-6 w-6 text-yellow-500 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">Shortlisted Jobs</h2>
            </div>
            <p className="mt-1 text-sm text-gray-500">
              View and manage your shortlisted job opportunities
            </p>
          </div>

          <div className="p-6">
            {isLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                <p className="mt-2 text-gray-500">Loading shortlisted jobs...</p>
              </div>
            ) : shortlistedJobs.length === 0 ? (
              <div className="text-center py-8">
                <Star className="h-12 w-12 text-gray-400 mx-auto" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No shortlisted jobs</h3>
                <p className="mt-1 text-sm text-gray-500">
                  You haven't shortlisted any jobs yet
                </p>
                <div className="mt-6">
                  <Link
                    to="/jobs"
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Browse Jobs
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {shortlistedJobs.map((job) => (
                  <div
                    key={job.id}
                    className="bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">
                            <Link to={`/jobs/${job.id}`} className="hover:text-blue-600">
                              {job.title}
                            </Link>
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">{job.company}</p>
                        </div>
                        <button
                          onClick={() => handleRemoveFromShortlist(job.id)}
                          className="p-2 text-gray-400 hover:text-red-500"
                          title="Remove from shortlist"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-4">
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin className="h-4 w-4 mr-1.5" />
                          {job.location}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Briefcase className="h-4 w-4 mr-1.5" />
                          {job.jobType}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <DollarSign className="h-4 w-4 mr-1.5" />
                          {job.salary}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="h-4 w-4 mr-1.5" />
                          Posted {formatDate(job.createdAt)}
                        </div>
                      </div>

                      <div className="mt-4 flex justify-end">
                        <Link
                          to={`/jobs/${job.id}`}
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ShortlistedJobs;