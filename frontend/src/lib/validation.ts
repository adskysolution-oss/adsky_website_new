export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
export const PASSWORD_REQUIREMENTS_TEXT =
  'Password must be at least 8 characters and include uppercase, lowercase, a number, and a special character.';

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const PHONE_REGEX = /^[+]?[0-9\s()-]{10,20}$/;

export const isValidEmail = (value: string) => EMAIL_REGEX.test(value.trim());
export const isValidPhone = (value: string) => PHONE_REGEX.test(value.trim());
