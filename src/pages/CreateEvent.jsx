import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { events } from '../utils/api';

export default function CreateEvent() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    capacity: '',
    type: 'Academic'
  });
  const [loading, setLoading] = useState(false);

  const eventTypes = [
    'Academic',
    'Social',
    'Sports',
    'Cultural',
    'Workshop',
    'Conference'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate required fields
    if (!formData.date || !formData.time) {
      toast.error('Please fill in all required fields');
      setLoading(false);
      return;
    }

    try {
      // Format the data before submission
      const formattedData = {
        ...formData,
        capacity: parseInt(formData.capacity, 10),
        date: formData.date,
        time: formData.time
      };

      await events.create(formattedData);
      toast.success('Event created successfully!');
      navigate('/events');
    } catch (error) {
      console.error('Error creating event:', error);
      if (error.response?.status === 401) {
        toast.error('Please log in as an admin to create events');
        navigate('/login');
      } else {
        toast.error(error.response?.data?.message || 'Failed to create event');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="bg-white px-6 py-5 shadow-sm rounded-lg mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Create New Event</h1>
          <p className="mt-1 text-sm text-gray-500">Fill in the event details below</p>
        </div>

        {/* Form Section */}
        <div className="bg-white shadow-sm rounded-lg">
          <form onSubmit={handleSubmit} className="divide-y divide-gray-200">
            <div className="px-6 py-5 space-y-6">
              {/* Title */}
              <div>
                <label htmlFor="title" className="label">
                  Event Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="input bg-white text-gray-900"
                  placeholder="Enter a descriptive title"
                />
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="label">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="input bg-white text-gray-900"
                  placeholder="Provide a detailed description of the event"
                />
              </div>

              {/* Date and Time */}
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="date" className="label">
                    Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="input bg-white text-gray-900"
                  />
                </div>

                <div>
                  <label htmlFor="time" className="label">
                    Time
                  </label>
                  <input
                    type="time"
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                    className="input bg-white text-gray-900"
                  />
                </div>
              </div>

              {/* Location and Capacity */}
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="location" className="label">
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    className="input bg-white text-gray-900"
                    placeholder="Enter event location"
                  />
                </div>

                <div>
                  <label htmlFor="capacity" className="label">
                    Capacity
                  </label>
                  <input
                    type="number"
                    id="capacity"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleChange}
                    required
                    min="1"
                    className="input bg-white text-gray-900"
                    placeholder="Maximum number of attendees"
                  />
                </div>
              </div>

              {/* Event Type */}
              <div>
                <label htmlFor="type" className="label">
                  Event Type
                </label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                  className="input bg-white text-gray-900"
                >
                  {eventTypes.map(type => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Form Actions */}
            <div className="px-6 py-4 bg-gray-50 rounded-b-lg flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => navigate('/events')}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`btn btn-primary ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
              >
                {loading ? 'Creating...' : 'Create Event'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
