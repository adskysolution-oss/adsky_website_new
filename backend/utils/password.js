const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
const PASSWORD_REQUIREMENTS_TEXT = 'Password must be at least 8 characters and include uppercase, lowercase, a number, and a special character.';

module.exports = { PASSWORD_REGEX, PASSWORD_REQUIREMENTS_TEXT };
