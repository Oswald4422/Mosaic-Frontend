import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { admin } from '../utils/api';
import { XMarkIcon } from '@heroicons/react/24/outline';

export default function EventRegistrations({ eventId, onClose }) {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRegistrations();
  }, [eventId]);

  const fetchRegistrations = async () => {
    try {
      setLoading(true);
      const response = await admin.getEventRegistrations(eventId);
      setRegistrations(response.data);
    } catch (error) {
      toast.error('Failed to fetch registrations');
      console.error('Error fetching registrations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelRegistration = async (userId) => {
    if (!window.confirm('Are you sure you want to cancel this registration?')) return;
    
    try {
      await admin.cancelRegistration(eventId, userId);
      toast.success('Registration cancelled successfully');
      fetchRegistrations();
    } catch (error) {
      toast.error('Failed to cancel registration');
      console.error('Error cancelling registration:', error);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full mx-auto p-6">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full mx-auto">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center border-b border-gray-200">
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Event Registrations
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {registrations.length} registrations
          </p>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-500"
        >
          <span className="sr-only">Close</span>
          <XMarkIcon className="h-6 w-6" />
        </button>
      </div>
      
      <div className="px-4 py-5 sm:p-6">
        {registrations.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-sm text-gray-500">No registrations found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {registrations.map((registration) => (
                  <tr key={registration.user._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {registration.user.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {registration.user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleCancelRegistration(registration.user._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Cancel Registration
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
