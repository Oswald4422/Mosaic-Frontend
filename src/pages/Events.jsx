import { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { toast } from 'react-hot-toast';
import { events } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { CalendarIcon, MapPinIcon, UsersIcon, TagIcon } from '@heroicons/react/24/outline';

export default function Events() {
  const [eventsData, setEventsData] = useState({ events: [], pagination: { total: 0, page: 1, pages: 0 } });
  const [viewMode, setViewMode] = useState('calendar'); // 'calendar' or 'list'
  const [selectedEventTypes, setSelectedEventTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  
  const eventTypes = [
    'Academic',
    'Social',
    'Sports',
    'Cultural',
    'Workshop',
    'Conference'
  ];

  useEffect(() => {
    fetchEvents();
  }, [selectedEventTypes]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await events.getAll({ types: selectedEventTypes.join(',') });
      setEventsData(response.data);
    } catch (error) {
      toast.error('Failed to fetch events');
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRSVP = async (eventId) => {
    try {
      await events.register(eventId);
      toast.success('Successfully registered for event!');
      fetchEvents();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to register');
    }
  };

  const handleEventTypeToggle = (type) => {
    setSelectedEventTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const calendarEvents = eventsData.events.map(event => ({
    id: event._id,
    title: event.title,
    start: event.date,
    allDay: true,
    extendedProps: {
      location: event.location,
      description: event.description,
      time: event.time,
      type: event.type,
      availableSeats: event.capacity - (event.registrations?.length || 0)
    }
  }));

  const handleEventClick = info => {
    const event = eventsData.events.find(e => e._id === info.event.id);
    if (event) {
      toast(
        <div className="space-y-3 p-2">
          <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
          <div className="space-y-2">
            <p className="flex items-center text-gray-600">
              <MapPinIcon className="h-5 w-5 mr-2 text-primary-500" />
              {event.location}
            </p>
            <p className="flex items-center text-gray-600">
              <CalendarIcon className="h-5 w-5 mr-2 text-primary-500" />
              {new Date(event.date).toLocaleDateString()} at {event.time}
            </p>
            <p className="flex items-center text-gray-600">
              <TagIcon className="h-5 w-5 mr-2 text-primary-500" />
              {event.type}
            </p>
            <p className="flex items-center text-gray-600">
              <UsersIcon className="h-5 w-5 mr-2 text-primary-500" />
              {event.capacity - (event.registrations?.length || 0)} seats available
            </p>
          </div>
          {user && (
            <button
              onClick={() => {
                handleRSVP(event._id);
                toast.dismiss();
              }}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:text-sm"
            >
              RSVP
            </button>
          )}
        </div>,
        {
          duration: 5000,
          position: 'bottom-right',
        }
      );
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white px-4 py-5 shadow-sm rounded-lg sm:px-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Campus Events</h1>
              <p className="mt-1 text-sm text-gray-500">View and register for upcoming events</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setViewMode('calendar')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  viewMode === 'calendar'
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Calendar
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  viewMode === 'list'
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                List
              </button>
            </div>
          </div>
        </div>

        {/* Event Type Filters */}
        <div className="bg-white shadow-sm rounded-lg mb-6">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Filter by Event Type</h3>
            <div className="flex flex-wrap gap-2">
              {eventTypes.map(type => (
                <button
                  key={type}
                  onClick={() => handleEventTypeToggle(type)}
                  className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${
                    selectedEventTypes.includes(type)
                      ? 'bg-primary-100 text-primary-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Calendar/List View */}
        <div className="bg-white shadow-sm rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            {viewMode === 'calendar' ? (
              <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={calendarEvents}
                eventClick={handleEventClick}
                height="auto"
                headerToolbar={{
                  left: 'prev,next today',
                  center: 'title',
                  right: 'dayGridMonth,dayGridWeek'
                }}
              />
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {eventsData.events.map(event => (
                  <div
                    key={event._id}
                    className="bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{event.title}</h3>
                      <div className="space-y-2">
                        <p className="flex items-center text-gray-600">
                          <CalendarIcon className="h-5 w-5 mr-2 text-primary-500" />
                          {new Date(event.date).toLocaleDateString()} at {event.time}
                        </p>
                        <p className="flex items-center text-gray-600">
                          <MapPinIcon className="h-5 w-5 mr-2 text-primary-500" />
                          {event.location}
                        </p>
                        <p className="flex items-center text-gray-600">
                          <UsersIcon className="h-5 w-5 mr-2 text-primary-500" />
                          {event.capacity - (event.registrations?.length || 0)} seats available
                        </p>
                        <p className="flex items-center text-gray-600">
                          <TagIcon className="h-5 w-5 mr-2 text-primary-500" />
                          {event.type}
                        </p>
                      </div>
                      {user && (
                        <button
                          onClick={() => handleRSVP(event._id)}
                          className="mt-4 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:text-sm"
                        >
                          RSVP
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
