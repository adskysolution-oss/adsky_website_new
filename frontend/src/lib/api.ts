import axios from 'axios';

// Ensure the base URL is clean and derived from env
const rawBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
export const API_BASE_URL = rawBaseUrl.endsWith('/api') ? rawBaseUrl : `${rawBaseUrl.replace(/\/+$/, '')}/api`;

/**
 * Production-ready API client configured for cookie-based authentication.
 */
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
  withCredentials: true,
});

/**
 * Global response interceptor to handle common error patterns
 */
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // We can add global 401 handling here later if needed
    return Promise.reject(error);
  }
);

/**
 * Utility to extract messages from Axios errors safely
 */
export function extractErrorMessage(error: unknown, fallback = 'An unexpected error occurred. Please try again.'): string {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || error.message || fallback;
  }
  return fallback;
}
