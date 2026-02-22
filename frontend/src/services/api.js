import axios from 'axios';

// Use environment variable or fallback to localhost
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const calculateSemesterGPA = async (subjects) => {
  try {
    const response = await api.post('/calculate/semester-gpa', { subjects });
    return response.data;
  } catch (error) {
    throw error.response?.data?.detail || 'Failed to calculate GPA';
  }
};

export const calculateCGPA = async (semesters) => {
  try {
    const response = await api.post('/calculate/cgpa', { semesters });
    return response.data;
  } catch (error) {
    throw error.response?.data?.detail || 'Failed to calculate CGPA';
  }
};

export default api;
