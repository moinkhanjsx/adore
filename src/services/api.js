import axios from 'axios';

// Create axios instance with base URL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    console.log(`API Success [${response.config.method.toUpperCase()} ${response.config.url}]:`, response.status);
    return response;
  },
  (error) => {
    console.error(`API Error [${error.config?.method?.toUpperCase() || 'UNKNOWN'} ${error.config?.url || 'UNKNOWN'}]:`, {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      message: error.message
    });
    
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  forgotPassword: (emailData) => api.post('/auth/forgot-password', emailData),
  resetPassword: (token, passwordData) => api.post(`/auth/reset-password/${token}`, passwordData),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (userData) => api.put('/auth/profile', userData),
};

// Products API calls
export const productAPI = {
  getProducts: (params = {}) => api.get('/products', { params }),
  getProduct: (id) => api.get(`/products/${id}`),
  getCategories: () => api.get('/products/categories/list'),
};

// Services API calls
export const serviceAPI = {
  getServices: () => api.get('/services'),
  getService: (id) => api.get(`/services/${id}`),
};

// News API calls
export const newsAPI = {
  getNews: () => api.get('/news'),
  getNewsArticle: (id) => api.get(`/news/${id}`),
};

// Contact API calls
export const contactAPI = {
  submitContact: (contactData) => api.post('/contact', contactData),
  getContacts: () => api.get('/contact'),
  getContact: (id) => api.get(`/contact/${id}`),
  updateContactStatus: (id, status) => api.put(`/contact/${id}`, { status }),
};

// Bookings API calls
export const bookingAPI = {
  createBooking: (bookingData) => api.post('/bookings', bookingData),
  getUserBookings: () => api.get('/bookings/user'),
  getBooking: (id) => api.get(`/bookings/${id}`),
  updateBooking: (id, updateData) => api.put(`/bookings/${id}`, updateData),
  cancelBooking: (id) => api.delete(`/bookings/${id}`),
};

export default api;
