import { useState } from 'react';
import { fetchMovies, fetchMovieDetails } from '../utils/api';

export function useMovies(apiKey) {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  async function search(query) {
    const results = await fetchMovies(query, apiKey);
    setMovies(results);
  };

  async function selectMovie (id) {
    const details = await fetchMovieDetails(id, apiKey);
    setSelectedMovie(details);
  };

  return { movies, selectedMovie, search, selectMovie, setSelectedMovie };
}
