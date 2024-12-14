import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request logging
const logRequest = (config) => {
  console.group('🌐 API Request');
  console.log('URL:', `${config.baseURL}${config.url}`);
  console.log('Method:', config.method.toUpperCase());
  
  // Add token to request if it exists
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log('🔑 Token attached');
  } else {
    console.log('⚠️ No token found');
  }

  console.log('Headers:', config.headers);
  if (config.data) {
    console.log('Data:', config.data);
  }
  if (config.params) {
    console.log('Params:', config.params);
  }
  console.groupEnd();
  return config;
};

// Response logging
const logResponse = (response) => {
  console.group('✅ API Response');
  console.log('Status:', response.status);
  console.log('Data:', response.data);
  console.groupEnd();
  return response;
};

// Error logging
const logError = (error) => {
  console.group('❌ API Error');
  console.error('Message:', error.message);
  if (error.response) {
    console.error('Status:', error.response.status);
    console.error('Data:', error.response.data);
  }
  console.error('Config:', {
    url: error.config.url,
    method: error.config.method,
    headers: error.config.headers,
    data: error.config.data
  });
  console.groupEnd();

  // Handle 401 errors (unauthorized)
  if (error.response?.status === 401) {
    console.log('🚫 Unauthorized - Redirecting to login');
    localStorage.removeItem('token');
    window.location.href = '/login';
  }

  return Promise.reject(error);
};

// Add request interceptor
api.interceptors.request.use(logRequest, logError);

// Add response interceptor
api.interceptors.response.use(logResponse, logError);

// Auth API calls
const auth = {
  login: async (credentials) => {
    console.log('🔑 Attempting login:', { email: credentials.email });
    const response = await api.post('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      console.log('✅ Login successful, token stored');
    }
    return response;
  },
  register: async (userData) => {
    console.log('📝 Attempting registration:', { email: userData.email });
    const response = await api.post('/auth/register', userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      console.log('✅ Registration successful, token stored');
    }
    return response;
  },
  getCurrentUser: async () => {
    console.log('👤 Fetching current user');
    return api.get('/auth/me');
  },
  logout: () => {
    console.log('🚪 Logging out');
    localStorage.removeItem('token');
  }
};

// Events API calls
const events = {
  getAll: async (filters) => {
    return await api.get('/events', { params: filters });
  },
  getById: async (id) => {
    return await api.get(`/events/${id}`);
  },
  getRegistered: async () => {
    return await api.get('/events/registered');
  },
  register: async (eventId) => {
    return await api.post(`/events/${eventId}/register`);
  },
  cancelRegistration: async (eventId) => {
    return await api.delete(`/events/${eventId}/register`);
  },
  search: async (query) => {
    return await api.get('/events/search', { params: { q: query } });
  },
  create: async (eventData) => {
    return await api.post('/events/admin', eventData);
  },
  delete: async (eventId) => {
    return await api.delete(`/events/admin/${eventId}`);
  }
};

// Admin API calls
const admin = {
  getAllRegistrations: async () => {
    console.log('👥 Fetching all registrations');
    return await api.get('/admin/registrations');
  },
  getAllEvents: async () => {
    console.log('📅 Fetching all events for admin');
    return await api.get('/admin/events');
  },
  getEventRegistrations: async (eventId) => {
    console.log(`👥 Fetching registrations for event ${eventId}`);
    return await api.get(`/admin/events/${eventId}/registrations`);
  },
  cancelRegistration: async (eventId, userId) => {
    console.log(`❌ Cancelling registration for event ${eventId} user ${userId}`);
    return await api.delete(`/admin/events/${eventId}/registrations/${userId}`);
  },
  createEvent: async (eventData) => {
    console.log('📝 Creating new event:', eventData);
    return await api.post('/admin/events', eventData);
  },
  updateEvent: async (eventId, eventData) => {
    console.log(`✏️ Updating event ${eventId}:`, eventData);
    return await api.put(`/admin/events/${eventId}`, eventData);
  },
  deleteEvent: async (eventId) => {
    console.log(`🗑️ Deleting event ${eventId}`);
    return await api.delete(`/admin/events/${eventId}`);
  },
  getDashboardStats: async () => {
    console.log('📊 Fetching dashboard stats');
    return await api.get('/admin/dashboard');
  }
};

// User API calls
const users = {
  updatePreferences: async (preferences) => {
    console.log('⚙️ Updating user preferences:', preferences);
    try {
      const response = await api.put('/users/preferences', { preferences });
      console.log('✅ Preferences updated:', response.data);
      return response;
    } catch (error) {
      console.error('❌ Error updating preferences:', error.response?.data || error.message);
      throw error;
    }
  },
  getProfile: async () => {
    console.log('👤 Fetching user profile');
    return api.get('/users/profile');
  },
  updateProfile: async (profileData) => {
    console.log('✏️ Updating user profile', profileData);
    return api.put('/users/profile', profileData);
  },
  getRegisteredEvents: async () => {
    console.log('🎫 Fetching user registered events');
    return api.get('/users/events');
  }
};

export {
  auth,
  events,
  admin,
  users
};
