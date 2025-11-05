import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import TopSearchBanner from '../components/TopSearchBanner';
import HistorySidebar from '../components/HistorySidebar';
import ImageGrid from '../components/ImageGrid';

const HomePage = () => {
  const [term, setTerm] = useState('');
  const [results, setResults] = useState([]);
  const [searchInfo, setSearchInfo] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);
  const [historyKey, setHistoryKey] = useState(0); // To trigger history refresh

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!term) return;

    try {
      const res = await axios.post('/api/search', { term });
      setResults(res.data.results);
      setSearchInfo(`You searched for "${term}" -- ${res.data.total} results found.`);
      setSelectedImages([]); // Reset selection
      setHistoryKey(prevKey => prevKey + 1); // Increment key to refresh history
    } catch (err) {
      console.error('Search error', err);
      setSearchInfo('Something went wrong with the search.');
    }
  };

  const handleSelectImage = (id) => {
    setSelectedImages((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((imgId) => imgId !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <TopSearchBanner />
        <form className="search-bar" onSubmit={handleSearch}>
          <input
            type="text"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="Search for high-resolution images..."
          />
          <button type="submit">Search</button>
        </form>

        <div className="main-layout">
          <main className="main-content">
            {searchInfo && (
              <div className="search-info">
                <h3>{searchInfo}</h3>
                <span className="counter">
                  Selected: {selectedImages.length} images
                </span>
              </div>
            )}
            <ImageGrid
              images={results}
              selectedImages={selectedImages}
              onSelectImage={handleSelectImage}
            />
          </main>
          <HistorySidebar refreshKey={historyKey} />
        </div>
      </div>
    </>
  );
};

export default HomePage;