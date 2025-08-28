import { useState } from 'react';
import { useEffect } from "react";
import './App.css';
import SearchForm from './components/SearchForm';
import MovieList from './components/MovieList';
import MovieModal from './components/MovieModal';
import { useMovies } from './hooks/useMovies';

const API_KEY = "416220b8";

export default function App() {
  const [query, setQuery] = useState("");
  const { movies, selectedMovie, loading, error, search, loadMore, selectMovie, setSelectedMovie } = useMovies(API_KEY);

  useEffect(() => {
    function handleScroll() {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
        loadMore();
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadMore, loading]);

  function handleSubmit(e) {
    e.preventDefault();     
    search(query);     
  }

  return (
    <div className="App">

      <h1>🎬 Movie Explorer</h1>

      <SearchForm 
        query={query} 
        setQuery={setQuery} 
        handleSubmit={handleSubmit} 
      />

      <MovieList 
        movies={movies} 
        fetchMovieDetails={selectMovie} 
        loading={loading} 
        error={error}  
      />

      {selectedMovie && <MovieModal movie={selectedMovie} close={() => setSelectedMovie(null)} />}

    </div>

  )
}

