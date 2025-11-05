import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HistorySidebar = ({ refreshKey }) => { // Add refreshKey
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get('/api/history');
        setHistory(res.data);
      } catch (err) {
        console.error('Error fetching history', err);
      }
    };
    fetchHistory();
  }, [refreshKey]); // Re-fetch when refreshKey changes

  return (
    <aside className="sidebar">
      <div className="history-sidebar">
        <h3>Your Search History</h3>
        <ul>
          {history.length > 0 ? (
            history.map((item) => (
              <li key={item._id}>
                {item.term}
                <span>{new Date(item.timestamp).toLocaleString()}</span>
              </li>
            ))
          ) : (
            <li>No history found.</li>
          )}
        </ul>
      </div>
    </aside>
  );
};

export default HistorySidebar;