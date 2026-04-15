import axios from 'axios';

export const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api').replace(/\/+$/, '');
export const AUTH_API_URL = `${API_BASE_URL}/auth`;
export const JOBS_API_URL = `${API_BASE_URL}/jobs`;
export const APPLICATIONS_API_URL = `${API_BASE_URL}/applications`;

export const authApi = axios.create({
  baseURL: AUTH_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
export const PASSWORD_REQUIREMENTS_TEXT =
  'Password must be at least 8 characters and include uppercase, lowercase, a number, and a special character.';
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const PHONE_REGEX = /^[+]?[0-9\s()-]{10,20}$/;

export const isValidEmail = (value: string) => EMAIL_REGEX.test(value.trim());
export const isValidPhone = (value: string) => PHONE_REGEX.test(value.trim());

type ApiErrorShape = {
  message?: string;
};

export function extractAuthErrorMessage(error: unknown, fallback: string) {
  if (axios.isAxiosError<ApiErrorShape>(error)) {
    const responseMessage = error.response?.data?.message;
    if (typeof responseMessage === 'string' && responseMessage.trim()) {
      return responseMessage;
    }

    if (error.code === 'ECONNABORTED') {
      return 'The authentication service took too long to respond. Please try again.';
    }

    if (error.request) {
      return 'We couldn’t reach the authentication service. Please verify the API URL and backend CORS settings.';
    }
  }

  return fallback;
}
