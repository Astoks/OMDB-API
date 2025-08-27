import { useState } from 'react';
import './App.css';
import SearchForm from './components/SearchForm';
import MovieList from './components/MovieList';
import MovieModal from './components/MovieModal';
import { useMovies } from './hooks/useMovies';

const API_KEY = "416220b8";

export default function App() {
  const [query, setQuery] = useState("");
  const { movies, selectedMovie, search, selectMovie, setSelectedMovie } = useMovies(API_KEY);

  function handleSubmit(e) {
    e.preventDefault();     
    search(query);     
  }

  return (
    <div className="App">

      <h1>🎬 Movie Explorer</h1>

      <SearchForm query={query} setQuery={setQuery} handleSubmit={handleSubmit} />

      <MovieList movies={movies} fetchMovieDetails={selectMovie} />

      {selectedMovie && <MovieModal movie={selectedMovie} close={() => setSelectedMovie(null)} />}

    </div>

  )
}

