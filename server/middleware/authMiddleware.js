module.exports = {
  // Middleware to check if user is authenticated
  ensureAuth: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.status(401).json({ msg: 'User not authenticated' });
    }
  },
};