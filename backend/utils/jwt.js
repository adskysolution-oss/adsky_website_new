const jwt = require('jsonwebtoken');
const { getRequiredEnv } = require('./env');

const signAuthToken = (id, role) => jwt.sign(
  { id, role },
  getRequiredEnv('JWT_SECRET'),
  { expiresIn: process.env.JWT_EXPIRES_IN || '30d' },
);

const verifyAuthToken = (token) => jwt.verify(token, getRequiredEnv('JWT_SECRET'));

module.exports = { signAuthToken, verifyAuthToken };
