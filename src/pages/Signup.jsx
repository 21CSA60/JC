"use client"

import { useState, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import {
  Briefcase,
  User,
  Mail,
  Lock,
  MapPin,
  AlertCircle,
  Camera,
  X,
  Phone,
  Code,
  GraduationCap,
  Building,
  CheckCircle,
} from "lucide-react"

const Signup = () => {
  const navigate = useNavigate()
  const { signup } = useAuth()
  const fileInputRef = useRef(null)

  // Common form fields
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    address: "",
    phone: "",
    bio: "",
    userType: "Candidate",
    // Candidate-specific fields
    skills: "",
    education: "",
    experience: "",
    // Employer-specific fields
    company: "",
    position: "",
    specialization: "",
    industry: "",
    companySize: "",
    companyDescription: "",
  })

  // Form validation
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  // Profile image handling
  const [profileImage, setProfileImage] = useState(null)
  const [previewImage, setPreviewImage] = useState(null)

  // Password visibility
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        setErrors((prev) => ({
          ...prev,
          profileImage: "Profile image must be less than 5MB",
        }))
        return
      }

      setProfileImage(file)
      setErrors((prev) => ({
        ...prev,
        profileImage: "",
      }))

      // Create preview URL
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  // Trigger file input click
  const handleImageClick = () => {
    fileInputRef.current.click()
  }

  // Remove profile image
  const handleRemoveImage = (e) => {
    e.stopPropagation()
    setProfileImage(null)
    setPreviewImage(null)
  }

  // Validate form
  const validateForm = () => {
    const newErrors = {}

    // Validate common fields
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email address is invalid"

    if (!formData.password) newErrors.password = "Password is required"
    else if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters"

    if (!formData.confirmPassword) newErrors.confirmPassword = "Please confirm your password"
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match"

    if (!formData.gender) newErrors.gender = "Please select your gender"
    if (!formData.address.trim()) newErrors.address = "Address is required"
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required"

    // Validate role-specific fields
    if (formData.userType === "Candidate") {
      if (!formData.skills.trim()) newErrors.skills = "Please enter your skills"
      if (!formData.education.trim()) newErrors.education = "Please enter your education background"
      if (!formData.experience.trim()) newErrors.experience = "Please enter your work experience"
    } else if (formData.userType === "Employer") {
      if (!formData.company.trim()) newErrors.company = "Company name is required"
      if (!formData.position.trim()) newErrors.position = "Position is required"
      if (!formData.specialization.trim()) newErrors.specialization = "Specialization is required"
      if (!formData.industry.trim()) newErrors.industry = "Industry is required"
      if (!formData.companySize.trim()) newErrors.companySize = "Company size is required"
      if (!formData.companyDescription.trim()) newErrors.companyDescription = "Company description is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()

    // Reset success state
    setSubmitSuccess(false)

    // Validate form
    if (!validateForm()) {
      // Scroll to the first error
      const firstError = Object.keys(errors)[0]
      const errorElement = document.getElementById(firstError)
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: "smooth", block: "center" })
      }
      return
    }

    try {
      setIsSubmitting(true)

      // Prepare data for submission
      const userData = {
        ...formData,
        profileImage: profileImage,
      }

      // Call signup function from AuthContext
      await signup(userData)

      // Show success message
      setSubmitSuccess(true)

      // Reset form after successful submission
      setTimeout(() => {
        // Redirect based on user type
        if (formData.userType === "Employer") {
          navigate("/employer/dashboard")
        } else {
          navigate("/candidate/dashboard")
        }
      }, 2000)
    } catch (err) {
      setErrors((prev) => ({
        ...prev,
        submit: "Failed to create an account. Please try again.",
      }))
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Render form field with label and error message
  const renderField = (id, label, type, name, value, placeholder, icon, required = true) => {
    return (
      <div className="mb-4">
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <div className="relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">{icon}</div>
          <input
            id={id}
            type={type}
            name={name}
            value={value}
            onChange={handleChange}
            className={`block w-full pl-10 pr-3 py-2 border ${
              errors[name] ? "border-red-300" : "border-gray-300"
            } rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
            placeholder={placeholder}
          />
          {name === "password" && (
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              )}
            </button>
          )}
          {name === "confirmPassword" && (
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              )}
            </button>
          )}
        </div>
        {errors[name] && <p className="mt-1 text-sm text-red-600">{errors[name]}</p>}
      </div>
    )
  }

  // Render textarea field
  const renderTextarea = (id, label, name, value, placeholder, icon, required = false) => {
    return (
      <div className="mb-4">
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <div className="relative rounded-md shadow-sm">
          <div className="absolute top-3 left-3 flex items-start pointer-events-none">{icon}</div>
          <textarea
            id={id}
            name={name}
            value={value}
            onChange={handleChange}
            rows={4}
            className={`block w-full pl-10 pr-3 py-2 border ${
              errors[name] ? "border-red-300" : "border-gray-300"
            } rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
            placeholder={placeholder}
          />
        </div>
        {errors[name] && <p className="mt-1 text-sm text-red-600">{errors[name]}</p>}
      </div>
    )
  }

  // Render select field
  const renderSelect = (id, label, name, value, options, icon, required = true) => {
    return (
      <div className="mb-4">
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <div className="relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">{icon}</div>
          <select
            id={id}
            name={name}
            value={value}
            onChange={handleChange}
            className={`block w-full pl-10 pr-3 py-2 border ${
              errors[name] ? "border-red-300" : "border-gray-300"
            } rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
          >
            <option value="">Select {label}</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        {errors[name] && <p className="mt-1 text-sm text-red-600">{errors[name]}</p>}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <GraduationCap className="h-12 w-12 text-blue-600" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create your account</h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{" "}
          <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
            sign in to your existing account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {/* Success Message */}
          {submitSuccess && (
            <div className="mb-4 bg-green-50 border-l-4 border-green-400 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-green-700">Account created successfully! Redirecting to dashboard...</p>
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {errors.submit && (
            <div className="mb-4 bg-red-50 border-l-4 border-red-400 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertCircle className="h-5 w-5 text-red-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{errors.submit}</p>
                </div>
              </div>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Profile Image Upload */}
            <div className="flex flex-col items-center">
              <div className="relative cursor-pointer" onClick={handleImageClick}>
                {previewImage ? (
                  <div className="h-24 w-24 rounded-full overflow-hidden">
                    <img
                      src={previewImage || "/placeholder.svg"}
                      alt="Profile preview"
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-full">
                      <Camera className="h-8 w-8 text-white" />
                    </div>
                  </div>
                ) : (
                  <div className="h-24 w-24 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-4xl font-medium hover:bg-blue-200 transition-colors">
                    <Camera className="h-8 w-8" />
                  </div>
                )}

                {previewImage && (
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}

                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
              <p className="mt-2 text-xs text-gray-500">Upload a profile picture (optional)</p>
              {errors.profileImage && <p className="mt-1 text-sm text-red-600">{errors.profileImage}</p>}
            </div>

            {/* User Type Selection */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <button
                type="button"
                className={`py-3 px-4 rounded-md flex flex-col items-center justify-center border-2 ${
                  formData.userType === "Candidate"
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-300 hover:border-gray-400"
                }`}
                onClick={() => setFormData({ ...formData, userType: "Candidate" })}
              >
                <User className={`h-6 w-6 ${formData.userType === "Candidate" ? "text-blue-500" : "text-gray-400"}`} />
                <span
                  className={`mt-1 font-medium ${formData.userType === "Candidate" ? "text-blue-700" : "text-gray-700"}`}
                >
                  Candidate
                </span>
              </button>
              <button
                type="button"
                className={`py-3 px-4 rounded-md flex flex-col items-center justify-center border-2 ${
                  formData.userType === "Employer"
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-300 hover:border-gray-400"
                }`}
                onClick={() => setFormData({ ...formData, userType: "Employer" })}
              >
                <Building
                  className={`h-6 w-6 ${formData.userType === "Employer" ? "text-blue-500" : "text-gray-400"}`}
                />
                <span
                  className={`mt-1 font-medium ${formData.userType === "Employer" ? "text-blue-700" : "text-gray-700"}`}
                >
                  Employer
                </span>
              </button>
            </div>

            {/* Common Fields */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Personal Information</h3>

              {renderField(
                "fullName",
                "Full Name",
                "text",
                "fullName",
                formData.fullName,
                "John Doe",
                <User className="h-5 w-5 text-gray-400" />,
              )}

              {renderField(
                "email",
                "Email Address",
                "email",
                "email",
                formData.email,
                "you@example.com",
                <Mail className="h-5 w-5 text-gray-400" />,
              )}

              {renderField(
                "password",
                "Password",
                showPassword ? "text" : "password",
                "password",
                formData.password,
                "••••••••",
                <Lock className="h-5 w-5 text-gray-400" />,
              )}

              {renderField(
                "confirmPassword",
                "Confirm Password",
                showConfirmPassword ? "text" : "password",
                "confirmPassword",
                formData.confirmPassword,
                "••••••••",
                <Lock className="h-5 w-5 text-gray-400" />,
              )}

              {renderSelect(
                "gender",
                "Gender",
                "gender",
                formData.gender,
                [
                  { value: "Male", label: "Male" },
                  { value: "Female", label: "Female" },
                  { value: "Other", label: "Other" },
                ],
                <User className="h-5 w-5 text-gray-400" />,
              )}

              {renderField(
                "phone",
                "Phone Number",
                "tel",
                "phone",
                formData.phone,
                "+1 (555) 123-4567",
                <Phone className="h-5 w-5 text-gray-400" />,
              )}

              {renderField(
                "address",
                "Address",
                "text",
                "address",
                formData.address,
                "123 Main St, City, Country",
                <MapPin className="h-5 w-5 text-gray-400" />,
              )}

              {renderTextarea(
                "bio",
                "Bio",
                "bio",
                formData.bio,
                "Tell us about yourself...",
                <User className="h-5 w-5 text-gray-400" />,
                false,
              )}
            </div>

            {/* Role-specific Fields */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 border-b pb-2">
                {formData.userType === "Candidate" ? "Professional Information" : "Company Information"}
              </h3>

              {formData.userType === "Candidate" && (
                <>
                  {renderField(
                    "skills",
                    "Skills (comma separated)",
                    "text",
                    "skills",
                    formData.skills,
                    "JavaScript, React, Node.js",
                    <Code className="h-5 w-5 text-gray-400" />,
                  )}

                  {renderField(
                    "education",
                    "Education Background",
                    "text",
                    "education",
                    formData.education,
                    "BS Computer Science, Stanford University",
                    <GraduationCap className="h-5 w-5 text-gray-400" />,
                  )}

                  {renderField(
                    "experience",
                    "Work Experience",
                    "text",
                    "experience",
                    formData.experience,
                    "3 years as Frontend Developer",
                    <Briefcase className="h-5 w-5 text-gray-400" />,
                  )}
                </>
              )}

              {formData.userType === "Employer" && (
                <>
                  {renderField(
                    "company",
                    "Company Name",
                    "text",
                    "company",
                    formData.company,
                    "Acme Inc.",
                    <Building className="h-5 w-5 text-gray-400" />,
                  )}

                  {renderField(
                    "position",
                    "Your Position",
                    "text",
                    "position",
                    formData.position,
                    "HR Manager",
                    <Briefcase className="h-5 w-5 text-gray-400" />,
                  )}

                  {renderSelect(
                    "industry",
                    "Industry",
                    "industry",
                    formData.industry,
                    [
                      { value: "Technology", label: "Technology" },
                      { value: "Healthcare", label: "Healthcare" },
                      { value: "Finance", label: "Finance" },
                      { value: "Education", label: "Education" },
                      { value: "Manufacturing", label: "Manufacturing" },
                      { value: "Retail", label: "Retail" },
                      { value: "Construction", label: "Construction" },
                      { value: "Transportation", label: "Transportation" },
                      { value: "Energy", label: "Energy" },
                      { value: "Other", label: "Other" },
                    ],
                    <Building className="h-5 w-5 text-gray-400" />
                  )}

                  {renderSelect(
                    "companySize",
                    "Company Size",
                    "companySize",
                    formData.companySize,
                    [
                      { value: "1-10", label: "1-10 employees" },
                      { value: "11-50", label: "11-50 employees" },
                      { value: "51-200", label: "51-200 employees" },
                      { value: "201-500", label: "201-500 employees" },
                      { value: "501-1000", label: "501-1000 employees" },
                      { value: "1000+", label: "1000+ employees" },
                    ],
                    <Building className="h-5 w-5 text-gray-400" />
                  )}

                  {renderField(
                    "specialization",
                    "Hiring Specialization",
                    "text",
                    "specialization",
                    formData.specialization,
                    "Tech and Engineering",
                    <Code className="h-5 w-5 text-gray-400" />,
                  )}

                  {renderTextarea(
                    "companyDescription",
                    "Company Description",
                    "companyDescription",
                    formData.companyDescription,
                    "Tell us about your company...",
                    <Building className="h-5 w-5 text-gray-400" />,
                    true
                  )}
                </>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Creating account...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Already have an account?</span>
              </div>
            </div>

            <div className="mt-6">
              <Link
                to="/login"
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
