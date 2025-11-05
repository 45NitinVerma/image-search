const axios = require('axios');
const Search = require('../models/Search');

// @desc    Search for images
// @route   POST /api/search
exports.searchImages = async (req, res) => {
  const { term } = req.body;
  
  if (!term) {
    return res.status(400).json({ msg: 'Search term is required' });
  }

  try {
    // 1. Store the search term in MongoDB
    await Search.create({
      user: req.user._id,
      term: term.toLowerCase(),
    });

    // 2. Call Unsplash Search API
    const unsplashResponse = await axios.get(
      'https://api.unsplash.com/search/photos',
      {
        headers: {
          Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
        },
        params: {
          query: term,
          per_page: 20, // Get 20 images
        },
      }
    );

    // 3. Return image results
    res.json({
      results: unsplashResponse.data.results,
      total: unsplashResponse.data.total,
    });
  } catch (err) {
    console.error('API Error:', err.message);
    if (err.response && err.response.status === 401) {
       return res.status(500).json({ msg: 'Invalid Unsplash API Key' });
    }
    res.status(500).json({ msg: 'Server Error' });
  }
};

// @desc    Get top 5 search terms across all users
// @route   GET /api/top-searches
exports.getTopSearches = async (req, res) => {
  try {
    const topSearches = await Search.aggregate([
      {
        $group: {
          _id: '$term', // Group by the search term
          count: { $sum: 1 }, // Count occurrences
        },
      },
      {
        $sort: { count: -1 }, // Sort by count descending
      },
      {
        $limit: 5, // Get top 5
      },
    ]);

    // Format to return just an array of terms
    const terms = topSearches.map(item => item._id);
    res.json(terms);

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server Error' });
  }
};

// @desc    Get logged-in user's search history
// @route   GET /api/history
exports.getSearchHistory = async (req, res) => {
  try {
    const history = await Search.find({ user: req.user._id })
      .sort({ timestamp: -1 }) // Sort by most recent
      .limit(20); // Get last 20 searches

    res.json(history);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server Error' });
  }
};