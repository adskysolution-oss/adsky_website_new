export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
export const AUTH_API_URL = `${API_BASE_URL}/auth`;

export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
export const PASSWORD_REQUIREMENTS_TEXT =
  'Password must be at least 8 characters and include uppercase, lowercase, a number, and a special character.';
