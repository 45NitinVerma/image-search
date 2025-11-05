import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TopSearchBanner = () => {
  const [topSearches, setTopSearches] = useState([]);

  useEffect(() => {
    const fetchTopSearches = async () => {
      try {
        const res = await axios.get('/api/top-searches');
        console.log('API response for top searches:', res.data);
        setTopSearches(res.data);
      } catch (err) {
        console.error('Error fetching top searches', err);
      }
    };
    fetchTopSearches();
  }, []);

  return (
    <div className="top-search-banner">
      <strong>Top Searches:</strong>
      {topSearches.length > 0 ? (
        topSearches.map((term, index) => <span key={index}>{term}</span>)
      ) : (
        <p>No searches yet.</p>
      )}
    </div>
  );
};

export default TopSearchBanner;