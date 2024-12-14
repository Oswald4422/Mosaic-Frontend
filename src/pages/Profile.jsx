import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { events, users } from '../utils/api'
import { toast } from 'react-hot-toast'
import { 
  UserCircleIcon, 
  CalendarIcon, 
  MapPinIcon, 
  ClockIcon, 
  TagIcon,
  EnvelopeIcon,
  UserIcon,
  AcademicCapIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'

export default function Profile() {
  const { user, setUser } = useAuth()
  const [registeredEvents, setRegisteredEvents] = useState([])
  const [selectedPreferences, setSelectedPreferences] = useState([])
  const [loading, setLoading] = useState(true)
  const [savingPreferences, setSavingPreferences] = useState(false)
  const [activeTab, setActiveTab] = useState('upcoming')

  useEffect(() => {
    if (user?.preferences) {
      setSelectedPreferences(user.preferences)
    }
    fetchRegisteredEvents()
  }, [user])

  const eventTypes = [
    'Academic',
    'Social',
    'Sports',
    'Cultural',
    'Workshop',
    'Conference'
  ]

  const fetchRegisteredEvents = async () => {
    try {
      setLoading(true)
      const response = await events.getRegistered()
      setRegisteredEvents(response.data)
    } catch (error) {
      toast.error('Failed to fetch registered events')
      console.error('Error fetching events:', error)
    } finally {
      setLoading(false)
    }
  }

  const handlePreferenceToggle = (type) => {
    setSelectedPreferences(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    )
  }

  const handleSavePreferences = async () => {
    try {
      setSavingPreferences(true)
      const { data } = await users.updatePreferences(selectedPreferences)
      setUser({ ...user, preferences: data.preferences })
      toast.success('Preferences updated successfully!')
    } catch (error) {
      console.error('Error saving preferences:', error)
      toast.error('Failed to update preferences')
    } finally {
      setSavingPreferences(false)
    }
  }

  const handleCancelRegistration = async (eventId) => {
    try {
      await events.cancelRegistration(eventId)
      toast.success('Registration cancelled successfully')
      fetchRegisteredEvents()
    } catch (error) {
      toast.error('Failed to cancel registration')
      console.error('Error cancelling registration:', error)
    }
  }

  const filterEvents = (events, type) => {
    const now = new Date()
    return events.filter(event => {
      const eventDate = new Date(event.date)
      return type === 'upcoming' ? eventDate >= now : eventDate < now
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    )
  }

  return (
    <div className="flex-1 bg-gray-50 overflow-y-auto">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* User Info Section */}
          <div className="bg-white shadow rounded-lg p-6">
            {/* User Information Card */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center space-x-4">
                  <UserCircleIcon className="h-16 w-16 text-gray-400" />
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{user?.name}</h2>
                    <div className="mt-1 space-y-1">
                      <p className="flex items-center text-gray-500">
                        <EnvelopeIcon className="h-4 w-4 mr-2" />
                        {user?.email}
                      </p>
                      <p className="flex items-center text-gray-500">
                        <UserIcon className="h-4 w-4 mr-2" />
                        {user?.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Event Preferences Card */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Event Preferences
                </h3>
                <div className="space-y-3">
                  {eventTypes.map(type => (
                    <label
                      key={type}
                      className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedPreferences.includes(type)
                          ? 'bg-primary-50 border border-primary-200'
                          : 'hover:bg-gray-50 border border-gray-200'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedPreferences.includes(type)}
                        onChange={() => handlePreferenceToggle(type)}
                        className="form-checkbox h-5 w-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500 cursor-pointer"
                      />
                      <span className="ml-3 text-gray-900">{type}</span>
                    </label>
                  ))}
                </div>
                <button
                  onClick={handleSavePreferences}
                  disabled={savingPreferences}
                  className="mt-4 w-full inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <AcademicCapIcon className="h-5 w-5 mr-2" />
                  {savingPreferences ? 'Saving...' : 'Save Preferences'}
                </button>
              </div>
            </div>
          </div>

          {/* Events Section */}
          <div className="bg-white shadow rounded-lg p-6 mb-20">
            <div className="rounded-lg overflow-hidden">
              <div className="border-b border-gray-200">
                <div className="px-4 sm:px-6 lg:px-8">
                  <div className="flex justify-between items-center py-3">
                    <h2 className="text-lg font-medium text-gray-900">Your Events</h2>
                    <div className="flex space-x-4">
                      <button
                        onClick={() => setActiveTab('upcoming')}
                        className={`px-3 py-2 text-sm font-medium rounded-md ${
                          activeTab === 'upcoming'
                            ? 'bg-primary-100 text-primary-700'
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        Upcoming
                      </button>
                      <button
                        onClick={() => setActiveTab('past')}
                        className={`px-3 py-2 text-sm font-medium rounded-md ${
                          activeTab === 'past'
                            ? 'bg-primary-100 text-primary-700'
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        Past
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="divide-y divide-gray-200">
                {registeredEvents.length === 0 ? (
                  <div className="text-center py-12">
                    <CalendarIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No events</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {activeTab === 'upcoming'
                        ? "You haven't registered for any upcoming events"
                        : "You don't have any past events"}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4 py-4">
                    {filterEvents(registeredEvents, activeTab).map((event) => (
                      <div
                        key={event._id}
                        className="relative bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow p-6"
                      >
                        <div className="flex justify-between">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {event.title}
                          </h3>
                          {activeTab === 'upcoming' && (
                            <button
                              onClick={() => handleCancelRegistration(event._id)}
                              className="text-gray-400 hover:text-gray-500"
                              title="Cancel Registration"
                            >
                              <XMarkIcon className="h-5 w-5" />
                            </button>
                          )}
                        </div>
                        <div className="mt-2 grid grid-cols-2 gap-4">
                          <div className="flex items-center text-gray-500">
                            <CalendarIcon className="h-5 w-5 mr-2 text-gray-400" />
                            {new Date(event.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center text-gray-500">
                            <ClockIcon className="h-5 w-5 mr-2 text-gray-400" />
                            {event.time}
                          </div>
                          <div className="flex items-center text-gray-500">
                            <MapPinIcon className="h-5 w-5 mr-2 text-gray-400" />
                            {event.location}
                          </div>
                          <div className="flex items-center text-gray-500">
                            <TagIcon className="h-5 w-5 mr-2 text-gray-400" />
                            {event.type}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
