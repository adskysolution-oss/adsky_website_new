const validator = require('validator');

const normalizeEmail = (value) => {
  const input = String(value || '').trim().toLowerCase();
  if (!input || !validator.isEmail(input)) {
    return '';
  }

  return validator.normalizeEmail(input) || input;
};

const sanitizeText = (value) => validator.escape(String(value || '').trim());

const sanitizeOptionalText = (value) => {
  const text = String(value || '').trim();
  return text ? validator.escape(text) : undefined;
};

module.exports = { normalizeEmail, sanitizeText, sanitizeOptionalText };
