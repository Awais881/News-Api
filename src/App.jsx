import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

function App() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);

  const getAllData = async (e) => {
    if (e) e.preventDefault();

    try {
      let res = await axios.get(`http://hn.algolia.com/api/v1/search?query=${search}`)
      setData(res.data.hits)
      console.log(res.data);
    } catch (error) {
      console.log("Error: ", error)
    }
  }

  useEffect(() => {
    getAllData();
  }, [search])

  return (
    <div className="container">
      <h1 className="title">Search Live News</h1>
      <form onSubmit={getAllData}>
        <input
          type="search"
          className="search-input"
          placeholder="Enter your search query"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit" className="search-btn">Search</button>
      </form>

      <div className="news-container">
        {Array.isArray(data) && data.length > 0 ? (
          data.map((eachNews, i) => (
            <div className="card" key={i}>
              <p className="news-author"> {eachNews.created_at}</p>
              <h2 className="news-title">{eachNews.title}</h2>
              <a className="news-url" href={eachNews.url} target='_blank'>{eachNews.url}</a>
            </div>
          ))
        ) : (
          <p className="no-data-msg">No data available</p>
        )}
      </div>
    </div>
  );
}

export default App;
