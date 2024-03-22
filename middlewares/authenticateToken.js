const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  // Get the token from the request headers
  const token = req.headers['authorization']?.split(' ')[1];

  // Check if the token is missing
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized - Token missing' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.TOKEN);

    // Attach the decoded user information to the request for later use
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    // Token verification failed
    return res.status(401).json({ message: 'Unauthorized - Invalid token' });
  }
};

module.exports = {authenticateToken};
