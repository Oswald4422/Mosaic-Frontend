import { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'

export default function AdminRegistrations() {
  const [registrations, setRegistrations] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchRegistrations()
  }, [])

  const fetchRegistrations = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get('http://localhost:5000/api/admin/registrations', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setRegistrations(response.data)
    } catch (error) {
      toast.error('Failed to fetch registrations')
    } finally {
      setLoading(false)
    }
  }

  const handleCancelRegistration = async (eventId, userId) => {
    try {
      const token = localStorage.getItem('token')
      await axios.delete(`http://localhost:5000/api/admin/registrations/${eventId}/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      toast.success('Registration cancelled successfully')
      fetchRegistrations()
    } catch (error) {
      toast.error('Failed to cancel registration')
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Event Registrations</h2>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {registrations.map((reg) => (
            <li key={`${reg.event._id}-${reg.user._id}`} className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-blue-600 truncate">
                      {reg.event.name}
                    </p>
                    <div className="ml-2 flex-shrink-0">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {new Date(reg.event.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-600">
                      Registered by: {reg.user.name} ({reg.user.email})
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      Location: {reg.event.location}
                    </p>
                  </div>
                </div>
                <div className="ml-6">
                  <button
                    onClick={() => handleCancelRegistration(reg.event._id, reg.user._id)}
                    className="text-sm text-red-600 hover:text-red-900"
                  >
                    Cancel Registration
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {registrations.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No registrations found</p>
        </div>
      )}
    </div>
  )
}
