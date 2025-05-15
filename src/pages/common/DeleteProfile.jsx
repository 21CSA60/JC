import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { AlertTriangle } from "lucide-react";

const DeleteProfile = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmation, setConfirmation] = useState("");

  const handleDelete = async () => {
    if (confirmation !== currentUser.email) {
      alert("Email doesn't match");
      return;
    }

    setIsDeleting(true);
    try {
      // In a real app, make API call to delete profile
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Failed to delete profile:", error);
      setIsDeleting(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow-md rounded-lg">
          <div className="p-6 border-b border-red-200 bg-red-50">
            <div className="flex items-center">
              <AlertTriangle className="h-6 w-6 text-red-600 mr-2" />
              <h2 className="text-xl font-semibold text-red-700">Delete Profile</h2>
            </div>
            <p className="mt-2 text-sm text-red-600">
              Warning: This action cannot be undone. This will permanently delete your account
              and remove all associated data.
            </p>
          </div>

          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirm your email
              </label>
              <p className="text-sm text-gray-500 mt-1">
                Please type {currentUser?.email} to confirm.
              </p>
              <input
                type="email"
                value={confirmation}
                onChange={(e) => setConfirmation(e.target.value)}
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={confirmation !== currentUser?.email || isDeleting}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
              >
                {isDeleting ? "Deleting..." : "Delete Profile"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DeleteProfile;