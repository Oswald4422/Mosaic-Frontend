import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { admin } from '../utils/api';
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon, 
  UserGroupIcon,
  EyeIcon,
  CalendarIcon,
  MapPinIcon,
  UsersIcon
} from '@heroicons/react/24/outline';
import EventRegistrations from '../components/EventRegistrations';

export default function AdminEvents() {
  const [eventsData, setEventsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [viewMode, setViewMode] = useState('registrations'); // 'registrations' or 'details'
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await admin.getAllEvents();
      console.log('Fetched events:', response.data);
      setEventsData(response.data || []);
    } catch (error) {
      console.error('Error fetching events:', error);
      toast.error(error.response?.data?.message || 'Failed to fetch events');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (eventId) => {
    if (!window.confirm('Are you sure you want to delete this event? This action cannot be undone.')) {
      return;
    }
    
    try {
      setLoading(true);
      await admin.deleteEvent(eventId);
      toast.success('Event deleted successfully!');
      // Refresh the events list
      await fetchEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
      toast.error(error.response?.data?.message || 'Failed to delete event');
    } finally {
      setLoading(false);
    }
  };

  const handleViewEvent = (event) => {
    setSelectedEventId(event._id);
    setViewMode('details');
  };

  const handleViewRegistrations = (event) => {
    setSelectedEventId(event._id);
    setViewMode('registrations');
  };

  const EventDetailsModal = ({ event, onClose }) => {
    if (!event) return null;
    
    return (
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full mx-auto">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Event Details
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <span className="sr-only">Close</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <div className="space-y-6">
            <div>
              <h4 className="text-xl font-semibold text-gray-900">{event.title}</h4>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 mt-2">
                {event.type}
              </span>
            </div>
            <p className="text-gray-600">{event.description}</p>
            <div className="space-y-3">
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
                ({event.registrations?.length || 0}/{event.capacity})
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Events</h1>
          <p className="mt-2 text-sm text-gray-700">
            Create, edit, and manage campus events
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Link
            to="/admin/events/create"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Create Event
          </Link>
        </div>
      </div>

      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Event Name
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Date
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Location
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Type
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Capacity
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {eventsData.map((event) => (
                    <tr key={event._id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {event.title}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {new Date(event.date).toLocaleDateString()} at {event.time}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {event.location}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                          {event.type}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {event.registrations?.length || 0} / {event.capacity}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 space-x-2">
                        <button
                          onClick={() => handleViewEvent(event)}
                          className="text-primary-600 hover:text-primary-900"
                          title="View Details"
                        >
                          <EyeIcon className="h-5 w-5" aria-hidden="true" />
                          <span className="sr-only">View details</span>
                        </button>
                        <button
                          onClick={() => handleViewRegistrations(event)}
                          className="text-primary-600 hover:text-primary-900"
                          title="View Registrations"
                        >
                          <UserGroupIcon className="h-5 w-5" aria-hidden="true" />
                          <span className="sr-only">View registrations</span>
                        </button>
                        <button
                          onClick={() => navigate(`/admin/events/edit/${event._id}`)}
                          className="text-primary-600 hover:text-primary-900"
                          title="Edit Event"
                        >
                          <PencilIcon className="h-5 w-5" aria-hidden="true" />
                          <span className="sr-only">Edit event</span>
                        </button>
                        <button
                          onClick={() => handleDelete(event._id)}
                          className="text-red-600 hover:text-red-900"
                          title="Delete Event"
                        >
                          <TrashIcon className="h-5 w-5" aria-hidden="true" />
                          <span className="sr-only">Delete event</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedEventId && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-50">
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              {viewMode === 'registrations' ? (
                <EventRegistrations 
                  eventId={selectedEventId} 
                  onClose={() => setSelectedEventId(null)} 
                />
              ) : (
                <EventDetailsModal 
                  event={eventsData.find(e => e._id === selectedEventId)}
                  onClose={() => setSelectedEventId(null)}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
