const express = require('express');
const passport = require('passport');
const router = express.Router();

// @desc    Auth with Google
// @route   GET /auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// @desc    Google auth callback
// @route   GET /auth/google/callback
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: `${process.env.CLIENT_URL}/login` }),
  (req, res) => {
    res.redirect(process.env.CLIENT_URL); // Redirect to client homepage
  }
);

// @desc    Auth with GitHub
// @route   GET /auth/github
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

// @desc    GitHub auth callback
// @route   GET /auth/github/callback
router.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: `${process.env.CLIENT_URL}/login` }),
  (req, res) => {
    res.redirect(process.env.CLIENT_URL);
  }
);

// @desc    Auth with Facebook
// @route   GET /auth/facebook
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));

// @desc    Facebook auth callback
// @route   GET /auth/facebook/callback
router.get(
  '/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: `${process.env.CLIENT_URL}/login` }),
  (req, res) => {
    res.redirect(process.env.CLIENT_URL);
  }
);

// @desc    Get current logged in user
// @route   GET /auth/user
router.get('/user', (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.status(401).json({ msg: 'Not authenticated' });
  }
});

// @desc    Logout user
// @route   GET /auth/logout
router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) { return next(err); }
    req.session.destroy((err) => {
      res.clearCookie('connect.sid');
      res.json({ msg: 'Logged out' });
    });
  });
});

module.exports = router;