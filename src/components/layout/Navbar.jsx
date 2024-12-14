import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Bars3Icon, XMarkIcon, CalendarIcon } from '@heroicons/react/24/outline';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAdmin, logout } = useAuth();
  const location = useLocation();

  const isCurrentPath = (path) => location.pathname === path;

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-soft sticky top-0 z-50 transition-all duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex flex-1">
            <div className="flex flex-shrink-0 items-center">
              <Link 
                to="/" 
                className="group flex items-center space-x-2 transition-all duration-300 hover:scale-105"
              >
                <CalendarIcon className="h-8 w-8 text-primary-600 transition-colors group-hover:text-primary-500" />
                <span className="ml-2 text-xl font-bold bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">
                  Mosaic
                </span>
              </Link>
            </div>
            <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
              {user ? (
                <>
                  <Link
                    to="/events"
                    className={`inline-flex items-center px-1 pt-1 text-sm font-medium transition-all duration-200 ${
                      isCurrentPath('/events')
                        ? 'border-b-2 border-primary-500 text-primary-600'
                        : 'border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    }`}
                  >
                    Events
                  </Link>
                  {isAdmin && (
                    <Link
                      to="/admin/events"
                      className={`inline-flex items-center px-1 pt-1 text-sm font-medium transition-all duration-200 ${
                        isCurrentPath('/admin/events')
                          ? 'border-b-2 border-primary-500 text-primary-600'
                          : 'border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                      }`}
                    >
                      Manage Events
                    </Link>
                  )}
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className={`inline-flex items-center px-1 pt-1 text-sm font-medium transition-all duration-200 ${
                      isCurrentPath('/login')
                        ? 'border-b-2 border-primary-500 text-primary-600'
                        : 'border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    }`}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className={`inline-flex items-center px-1 pt-1 text-sm font-medium transition-all duration-200 ${
                      isCurrentPath('/register')
                        ? 'border-b-2 border-primary-500 text-primary-600'
                        : 'border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    }`}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {user && (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700">
                  Welcome, {user.name}
                </span>
                <button
                  onClick={logout}
                  className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 transition-all duration-200 hover:ring-primary-500"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
          <div className="flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`sm:hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'h-auto opacity-100' : 'h-0 opacity-0 overflow-hidden'}`}>
        <div className="space-y-1 pb-3 pt-2">
          {user ? (
            <>
              <Link
                to="/events"
                className={`block border-l-4 py-2 pl-3 pr-4 text-base font-medium transition-all duration-200 ${
                  isCurrentPath('/events')
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Events
              </Link>
              {isAdmin && (
                <Link
                  to="/admin/events"
                  className={`block border-l-4 py-2 pl-3 pr-4 text-base font-medium transition-all duration-200 ${
                    isCurrentPath('/admin/events')
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Manage Events
                </Link>
              )}
              <div className="border-t border-gray-200 pt-4 pb-3">
                <div className="px-4">
                  <div className="text-base font-medium text-gray-800">
                    {user.name}
                  </div>
                  <div className="text-sm font-medium text-gray-500">
                    {user.email}
                  </div>
                </div>
                <div className="mt-3 space-y-1">
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className={`block border-l-4 py-2 pl-3 pr-4 text-base font-medium transition-all duration-200 ${
                  isCurrentPath('/login')
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className={`block border-l-4 py-2 pl-3 pr-4 text-base font-medium transition-all duration-200 ${
                  isCurrentPath('/register')
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
