const User = require('../models/User');
const { verifyAuthToken } = require('../utils/jwt');

const protect = async (req, res, next) => {
  try {
    let token = req.cookies?.token;

    if (!token) {
      const header = req.headers.authorization;
      if (header && header.startsWith('Bearer ')) {
        token = header.split(' ')[1];
      }
    }

    if (!token) {
      return res.status(401).json({ message: 'Not authorized, no token provided.' });
    }

    const decoded = verifyAuthToken(token);
    const user = await User.findById(decoded.id).select('_id role accountStatus');

    if (!user || user.accountStatus !== 'Active') {
      return res.status(401).json({ message: 'Not authorized.' });
    }

    req.user = {
      id: user._id.toString(),
      role: user.role,
    };

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Not authorized, token failed.' });
  }
};

const authorize = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ message: `Role ${req.user.role} is not authorized to access this route` });
  }

  next();
};

module.exports = { protect, authorize };
