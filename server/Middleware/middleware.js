const jwt = require('jsonwebtoken');

const validateToken = (req, res, next) => {
  // Retrieve the token from the request headers or query params
  const token = req.headers.authorization.split(' ')[1] || null;
  // console.log(req.headers.authorization);
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.USER_SECRET);
    req.params = decoded; // Add the decoded user information to the request object
    next(); // Proceed to the next middleware
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = {
  validateToken
};
