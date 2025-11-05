const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/authMiddleware');
const {
  searchImages,
  getTopSearches,
  getSearchHistory,
} = require('../controllers/apiController');

// @desc    Search for images
// @route   POST /api/search
router.post('/search', ensureAuth, searchImages);

// @desc    Get top 5 search terms
// @route   GET /api/top-searches
router.get('/top-searches', ensureAuth, getTopSearches);

// @desc    Get user's search history
// @route   GET /api/history
router.get('/history', ensureAuth, getSearchHistory);

module.exports = router;