import React, { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';

function Page() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [activePage, setActivePage] = useState(0);

  const getAllData = async (e) => {
    if (e) e.preventDefault();

    setLoading(true);
    setError(null);

    try {
      let res = await axios.get(`https://hn.algolia.com/api/v1/search?query=${search}&page=${page}`);
      setData(res.data.hits);
    } catch (error) {
      setError("Error fetching news data.");
    }

    setLoading(false);
  }

  useEffect(() => {
    getAllData();
  }, [search, page])

  const handlePagination = (pageNumber) => {
    setPage(pageNumber);
    setActivePage(pageNumber);
  }

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  }

  return (
    <>
      <nav>

      <h1 className="title">Search Live News</h1>
      </nav>
    <div className="container">
      <form onSubmit={getAllData} className="search-form">
        <input
          type="search"
          className="search-input"
          placeholder="Enter your search query"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit" className="search-btn">Search</button>
      </form>

      {loading && <p className="loading-msg">Loading...</p>}
      {error && <p className="error-msg">{error}</p>}

      <div className="news-container">
        {Array.isArray(data) && data.length > 0 ? (
          data.map((eachNews, i) => (
             eachNews.title? 
            <div className="card" key={i}>
             
              <p className="news-author">{formatDate(eachNews.created_at)}</p>
              <h2 className="news-title">{eachNews.title}</h2>
              <a className="news-url" href={eachNews.url} target='_blank' >{eachNews.url}</a>
            
            </div>
            : null
            
          ))
        ) : (
          !loading && <p className="no-data-msg">No data available</p>
        )}
      </div>

      {search ==[] && (
        <div className="pagination-container">
          {[...Array(3)].map((_, i) => (
            <button
              key={i}
              className={`pagination-btn ${i === activePage ? 'active' : ''}`}
              onClick={() => handlePagination(i)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
    </>
  );
}

export default Page;
