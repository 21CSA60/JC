import { Link, useLocation } from "react-router-dom"
import { ChevronRight, Home } from "lucide-react"

const Breadcrumbs = ({ items = [] }) => {
  const location = useLocation()
  
  const defaultItems = [
    { label: "Home", path: "/", icon: <Home className="h-4 w-4" /> }
  ]

  const allItems = [...defaultItems, ...items]

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1
          const isActive = location.pathname === item.path

          return (
            <li key={item.path} className="flex items-center">
              {index > 0 && (
                <ChevronRight className="h-4 w-4 text-gray-400 mx-2 flex-shrink-0" />
              )}
              {isLast || isActive ? (
                <span className="text-sm font-medium text-gray-900 flex items-center">
                  {item.icon && <span className="mr-1">{item.icon}</span>}
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.path}
                  className="text-sm font-medium text-gray-500 hover:text-gray-700 flex items-center"
                >
                  {item.icon && <span className="mr-1">{item.icon}</span>}
                  {item.label}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export default Breadcrumbs