import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { events } from '../utils/api'
import { format, parseISO } from 'date-fns'
import { toast } from 'react-hot-toast'
import { 
  CalendarIcon, 
  FilterIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'

export default function Calendar() {
  const { user } = useAuth()
  const [eventsData, setEventsData] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedEventTypes, setSelectedEventTypes] = useState([])
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    console.log('Selected event types changed:', selectedEventTypes)
    fetchEvents()
  }, [selectedEventTypes])

  const fetchEvents = async () => {
    try {
      setLoading(true)
      console.log('Fetching events with types:', selectedEventTypes)
      const params = selectedEventTypes.length > 0 ? { types: selectedEventTypes.join(',') } : {}
      console.log('API params:', params)
      const response = await events.getAll(params)
      console.log('API response:', response.data)
      const eventsList = Array.isArray(response.data) ? response.data : response.data.events || []
      setEventsData(eventsList)
    } catch (error) {
      console.error('Error fetching events:', error)
      toast.error('Failed to fetch events')
    } finally {
      setLoading(false)
    }
  }

  const handleTypeToggle = (type) => {
    console.log('Toggling type:', type)
    setSelectedEventTypes(prev => {
      const newTypes = prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
      console.log('New selected types:', newTypes)
      return newTypes
    })
  }

  const eventTypes = [
    'Academic',
    'Social',
    'Sports',
    'Cultural',
    'Workshop',
    'Conference'
  ]

  // Group events by date
  const eventsByDate = eventsData.reduce((acc, event) => {
    const date = format(parseISO(event.date), 'yyyy-MM-dd')
    if (!acc[date]) {
      acc[date] = []
    }
    acc[date].push(event)
    return acc
  }, {})

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Campus Events</h1>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          {showFilters ? (
            <XMarkIcon className="h-5 w-5 mr-2" />
          ) : (
            <FilterIcon className="h-5 w-5 mr-2" />
          )}
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      {showFilters && (
        <div className="mb-6 p-4 bg-white rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-900 mb-3">Filter by Event Type</h2>
          <div className="flex flex-wrap gap-2">
            {eventTypes.map((type) => (
              <button
                key={type}
                onClick={() => handleTypeToggle(type)}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  selectedEventTypes.includes(type)
                    ? 'bg-primary-100 text-primary-800 border-2 border-primary-500'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200 border-2 border-transparent'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      )}

      {eventsData.length === 0 ? (
        <div className="text-center py-12">
          <CalendarIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No Events Found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {selectedEventTypes.length > 0 
              ? 'No events match your selected filters.'
              : 'There are no upcoming events.'}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {Object.entries(eventsByDate).sort().map(([date, dayEvents]) => (
            <div key={date} className="border-b border-gray-200 last:border-b-0">
              <div className="bg-gray-50 px-4 py-2">
                <h3 className="text-sm font-medium text-gray-900">
                  {format(parseISO(date), 'EEEE, MMMM d, yyyy')}
                </h3>
              </div>
              <div className="divide-y divide-gray-200">
                {dayEvents.map((event) => (
                  <div key={event._id} className="px-4 py-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-base font-medium text-gray-900">{event.title}</h4>
                        <div className="mt-1 text-sm text-gray-500">
                          <p>{format(parseISO(event.date), 'h:mm a')} • {event.location}</p>
                          <p className="mt-1">{event.description}</p>
                          {event.creator?.name && (
                            <p className="mt-1 text-xs">Created by: {event.creator.name}</p>
                          )}
                        </div>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        event.type === 'Academic' ? 'bg-blue-100 text-blue-800' :
                        event.type === 'Social' ? 'bg-green-100 text-green-800' :
                        event.type === 'Sports' ? 'bg-yellow-100 text-yellow-800' :
                        event.type === 'Cultural' ? 'bg-purple-100 text-purple-800' :
                        event.type === 'Workshop' ? 'bg-pink-100 text-pink-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {event.type}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
