import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Home() {
  const { user, isAdmin } = useAuth()

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Mosaic
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
               Discover. Engage. Belong.
           </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            {user ? (
              <>
                {isAdmin ? (
                  <Link
                    to="/admin/events"
                    className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  >
                    Manage Events
                  </Link>
                ) : (
                  <Link
                    to="/events"
                    className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  >
                    View Events
                  </Link>
                )}
              </>
            ) : (
              <>
                <Link
                  to="/register"
                  className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  Get Started
                </Link>
                <Link
                  to="/login"
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  Log in <span aria-hidden="true">→</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
