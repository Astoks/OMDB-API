import { useState } from 'react'
import './App.css'

export default function App() {
  
  const [movies, setMovies] = useState([]);
  const [searched, setSearched] = useState(false);
  const [query, setQuery] = useState("");

  const API_KEY = "416220b8";

  async function searchMovies(query) {
    if(!query.trim()) return;

    try{
      const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(query)}&type=movie`);
      setSearched(true);
      const data = await res.json();

      if (data.Response === "True") {
        setMovies(data.Search);
      }else{
        setMovies([]);
        alert(data.Error);
      }

    } catch (err) {
      console.log(err);
      alert("Network error");
    }
  }

  function handleSubmit(e) {
    e.preventDefault();     
    searchMovies(query);     
  }

  return (
    <div className="App">
      <h1>🎬 Movie Explorer</h1>

      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="search-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies..."
        />
        <button type="submit" className="search-button">Search</button>
      </form>

      <div className="results-grid">
        {searched && movies.length === 0 && <p>No results found</p>}
        {movies.map((m) => (
          <div key={m.imdbID} className="movie-card">
            <img
              className="movie-poster"
              src={m.Poster !== "N/A" ? m.Poster : "https://via.placeholder.com/300x445?text=No+Image"}
              alt={m.Title}
            />
            <div className="movie-info">
              <div className="movie-title">{m.Title}</div>
              <div className="movie-year">{m.Year}</div>
            </div>
          </div>
        ))}
      </div>
    </div>

  )
}

