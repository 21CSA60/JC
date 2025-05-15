import { useParams } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import DashboardLayout from "../../components/dashboard/DashboardLayout"
import { MapPin, Mail, Phone, Globe, Linkedin, Twitter, Facebook, Briefcase, GraduationCap } from "lucide-react"

const ViewProfile = ({ userRole }) => {
  const { id } = useParams()
  const { currentUser } = useAuth()
  const profile = id ? getUserProfile(id) : currentUser

  const publicUrl = `${window.location.origin}/profile/${profile.id}`

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="bg-white shadow-md rounded-lg">
          <div className="p-6 border-b flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Public Profile</h2>
              <p className="mt-1 text-sm text-gray-600">
                This is how your profile appears to other users
              </p>
            </div>
            {profile.isPublic && (
              <a
                href={publicUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-500"
              >
                Open Public Profile ↗
              </a>
            )}
          </div>

          <div className="p-6">
            {/* Profile Header */}
            <div className="flex items-center space-x-6 mb-8">
              <div className="h-24 w-24 rounded-full overflow-hidden bg-gray-100">
                {profile.profileImage ? (
                  <img
                    src={profile.profileImage}
                    alt={profile.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full bg-blue-100 flex items-center justify-center">
                    <span className="text-2xl font-medium text-blue-600">
                      {profile.name?.charAt(0)}
                    </span>
                  </div>
                )}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{profile.name}</h3>
                {profile.title && (
                  <p className="text-lg text-gray-600">{profile.title}</p>
                )}
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-center text-gray-600">
                <Mail className="h-5 w-5 mr-2" />
                <span>{profile.email}</span>
              </div>
              {profile.phone && (
                <div className="flex items-center text-gray-600">
                  <Phone className="h-5 w-5 mr-2" />
                  <span>{profile.phone}</span>
                </div>
              )}
              {profile.address && (
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>{profile.address}</span>
                </div>
              )}
            </div>

            {/* Bio */}
            {profile.bio && (
              <div className="mb-8">
                <h4 className="text-lg font-medium text-gray-900 mb-2">About</h4>
                <p className="text-gray-600 whitespace-pre-wrap">{profile.bio}</p>
              </div>
            )}

            {/* Skills */}
            {profile.skills && (
              <div className="mb-8">
                <h4 className="text-lg font-medium text-gray-900 mb-2">Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.split(",").map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      {skill.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Experience */}
            {profile.experience && (
              <div className="mb-8">
                <h4 className="text-lg font-medium text-gray-900 mb-2 flex items-center">
                  <Briefcase className="h-5 w-5 mr-2" />
                  Experience
                </h4>
                <div className="text-gray-600 whitespace-pre-wrap">
                  {profile.experience}
                </div>
              </div>
            )}

            {/* Education */}
            {profile.education && (
              <div className="mb-8">
                <h4 className="text-lg font-medium text-gray-900 mb-2 flex items-center">
                  <GraduationCap className="h-5 w-5 mr-2" />
                  Education
                </h4>
                <div className="text-gray-600 whitespace-pre-wrap">
                  {profile.education}
                </div>
              </div>
            )}

            {/* Social Links */}
            {(profile.website || profile.linkedin || profile.twitter || profile.facebook) && (
              <div className="border-t pt-6">
                <h4 className="text-lg font-medium text-gray-900 mb-4">Social Profiles</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {profile.website && (
                    <a
                      href={profile.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-gray-600 hover:text-blue-600"
                    >
                      <Globe className="h-5 w-5 mr-2" />
                      <span>Personal Website</span>
                    </a>
                  )}
                  {profile.linkedin && (
                    <a
                      href={profile.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-gray-600 hover:text-blue-600"
                    >
                      <Linkedin className="h-5 w-5 mr-2" />
                      <span>LinkedIn</span>
                    </a>
                  )}
                  {profile.twitter && (
                    <a
                      href={profile.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-gray-600 hover:text-blue-600"
                    >
                      <Twitter className="h-5 w-5 mr-2" />
                      <span>Twitter</span>
                    </a>
                  )}
                  {profile.facebook && (
                    <a
                      href={profile.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-gray-600 hover:text-blue-600"
                    >
                      <Facebook className="h-5 w-5 mr-2" />
                      <span>Facebook</span>
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default ViewProfile