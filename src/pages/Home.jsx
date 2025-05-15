// "use client"

// import { useState, useEffect } from "react"
// import { Link } from "react-router-dom"
// import { useJob } from "../contexts/JobContext"
// import JobCard from "../components/job/JobCard"
// import { Briefcase, Search, Building, Users } from "lucide-react"

// const Home = () => {
//   const { jobs, loading } = useJob()
//   const [featuredJobs, setFeaturedJobs] = useState([])

//   useEffect(() => {
//     // Get 3 random jobs for featured section
//     if (jobs.length > 0) {
//       const shuffled = [...jobs].sort(() => 0.5 - Math.random())
//       setFeaturedJobs(shuffled.slice(0, 3))
//     }
//   }, [jobs])

//   return (
//     <div>
//       {/* Hero Section */}
//       <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
//           <div className="text-center max-w-3xl mx-auto">
//             <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Find Your Dream Job Today</h1>
//             <p className="text-xl md:text-2xl mb-8">Connect with top employers and take the next step in your career</p>

//             <div className="bg-white rounded-lg shadow-lg p-2 md:p-4 flex flex-col md:flex-row gap-2">
//               <div className="relative flex-grow">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Search className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   type="text"
//                   placeholder="Job title, keywords, or company"
//                   className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900"
//                 />
//               </div>
//               <Link
//                 to="/jobs"
//                 className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 md:w-auto"
//               >
//                 Search Jobs
//               </Link>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Stats Section */}
//       <section className="py-12 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             <div className="bg-white p-6 rounded-lg shadow-md text-center">
//               <div className="inline-flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 text-blue-600 mb-4">
//                 <Briefcase className="h-6 w-6" />
//               </div>
//               <h3 className="text-3xl font-bold text-gray-900">1,000+</h3>
//               <p className="text-gray-600">Jobs Available</p>
//             </div>

//             <div className="bg-white p-6 rounded-lg shadow-md text-center">
//               <div className="inline-flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 text-blue-600 mb-4">
//                 <Building className="h-6 w-6" />
//               </div>
//               <h3 className="text-3xl font-bold text-gray-900">500+</h3>
//               <p className="text-gray-600">Companies</p>
//             </div>

//             <div className="bg-white p-6 rounded-lg shadow-md text-center">
//               <div className="inline-flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 text-blue-600 mb-4">
//                 <Users className="h-6 w-6" />
//               </div>
//               <h3 className="text-3xl font-bold text-gray-900">10,000+</h3>
//               <p className="text-gray-600">Candidates</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Featured Jobs Section */}
//       <section className="py-16">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Featured Jobs</h2>
//             <p className="text-xl text-gray-600 max-w-2xl mx-auto">Discover opportunities from leading companies</p>
//           </div>

//           {loading ? (
//             <div className="text-center py-12">Loading featured jobs...</div>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {featuredJobs.map((job) => (
//                 <JobCard key={job.id} job={job} />
//               ))}
//             </div>
//           )}

//           <div className="text-center mt-10">
//             <Link
//               to="/jobs"
//               className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//             >
//               View All Jobs
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* Trusted Partners Section */}
//       <section className="py-16 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Trusted Partners</h2>
//             <p className="text-xl text-gray-600 max-w-2xl mx-auto">We work with the best companies in the industry</p>
//           </div>

//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
//             {[...Array(6)].map((_, i) => (
//               <div key={i} className="flex justify-center">
//                 <div className="h-12 w-32 bg-gray-200 rounded-md flex items-center justify-center text-gray-500 font-semibold">
//                   Partner {i + 1}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="bg-blue-700 text-white py-16">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <h2 className="text-3xl font-extrabold mb-4">Ready to Find Your Next Opportunity?</h2>
//           <p className="text-xl mb-8 max-w-2xl mx-auto">
//             Join thousands of candidates who have found their dream jobs through JobConnect
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <Link
//               to="/signup"
//               className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-blue-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-700 focus:ring-white"
//             >
//               Sign Up Now
//             </Link>
//             <Link
//               to="/jobs"
//               className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-md shadow-sm text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-700 focus:ring-white"
//             >
//               Browse Jobs
//             </Link>
//           </div>
//         </div>
//       </section>
//     </div>
//   )
// }

// export default Home
"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useJob } from "../contexts/JobContext"
import JobCard from "../components/job/JobCard"
import { Briefcase, Search, Building, Users } from "lucide-react"
import CountUp from "react-countup";
const Home = () => {
  const { jobs, loading } = useJob()
  const [featuredJobs, setFeaturedJobs] = useState([])

  useEffect(() => {
    // Get 3 random jobs for featured section
    if (jobs.length > 0) {
      const shuffled = [...jobs].sort(() => 0.5 - Math.random())
      setFeaturedJobs(shuffled.slice(0, 3))
    }
  }, [jobs])

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Find Your Dream Job Today</h1>
            <p className="text-xl md:text-2xl mb-8">Connect with top employers and take the next step in your career</p>

            <div className="bg-white rounded-lg shadow-lg p-2 md:p-4 flex flex-col md:flex-row gap-2">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Job title, keywords, or company"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900"
                />
              </div>
              <Link
                to="/jobs"
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 md:w-auto"
              >
                Search Jobs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
       <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Jobs Available */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 text-blue-600 mb-4">
                <Briefcase className="h-6 w-6" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">
                <CountUp end={1000} duration={2} separator="," />+
              </h3>
              <p className="text-gray-600">Jobs Available</p>
            </div>

            {/* Companies */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 text-blue-600 mb-4">
                <Building className="h-6 w-6" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">
                <CountUp end={500} duration={2} separator="," />+
              </h3>
              <p className="text-gray-600">Companies</p>
            </div>

            {/* Candidates */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 text-blue-600 mb-4">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">
                <CountUp end={10000} duration={2.5} separator="," />+
              </h3>
              <p className="text-gray-600">Candidates</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Featured Jobs</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Discover opportunities from leading companies</p>
          </div>

          {loading ? (
            <div className="text-center py-12">Loading featured jobs...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          )}

          <div className="text-center mt-10">
            <Link
              to="/jobs"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              View All Jobs
            </Link>
          </div>
        </div>
      </section>

      {/* Trusted Partners Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Trusted Partners</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">We work with the best companies in the industry</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
        {/* Partner Logos */}
            { [
                {
                  name: "Google",
                  logo: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
                },
                {
                  name: "Amazon",
                  logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png",
                },
                {
                  name: "Microsoft",
                  logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png",
                },
                {
                  name: "Apple",
                  logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/488px-Apple_logo_black.svg.png",
                },
                {
                  name: "Meta",
                  logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/2560px-Meta_Platforms_Inc._logo.svg.png",
                },
                {
                  name: "Netflix",
                  logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png",
                },
              ].map((partner, i) => (
                <div key={i} className="flex justify-center">
                  <div className="h-16 w-40 p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 flex items-center justify-center">
                    <img
                      src={partner.logo}
                      alt={`${partner.name} logo`}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                </div>
              )) }
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold mb-4">Ready to Find Your Next Opportunity?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of candidates who have found their dream jobs through JobConnect
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-blue-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-700 focus:ring-white"
            >
              Sign Up Now
            </Link>
            <Link
              to="/jobs"
              className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-md shadow-sm text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-700 focus:ring-white"
            >
              Browse Jobs
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
