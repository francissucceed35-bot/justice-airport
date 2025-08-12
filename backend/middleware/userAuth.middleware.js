const jwt = require('jsonwebtoken');

const userAuthMiddleware = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res.status(401).send({ message: 'Access denied. No token provided.' });
  }

  const token = authHeader.replace('Bearer ', '');
  if (!token) {
    return res.status(401).send({ message: 'Access denied. No token provided.' });
  }

  try {
    // We use the same JWT_SECRET for signing and verifying
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info (id, name) to the request
    next(); // Proceed to the route
  } catch (error) {
    res.status(400).send({ message: 'Invalid token.' });
  }
};

module.exports = userAuthMiddleware;
