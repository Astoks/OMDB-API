import { useState } from 'react';
import { fetchMovies, fetchMovieDetails } from '../utils/api';

export function useMovies(apiKey) {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [page,setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function search(query) {
    setQuery(query);
    setPage(1);
    const results = await fetchMovies(query, 1, apiKey);
    setMovies(results || []);
  };

  async function loadMore() {
    if (isLoading) return;
    setIsLoading(true);
    
    const nextPage = page + 1;
    const results = await fetchMovies(query, nextPage, apiKey);
    if (results?.length) {
      setMovies(prev => {
        const newMovies = results.filter(
          movie => !prev.some(m => m.imdbID === movie.imdbID)
        );
        return [...prev, ...newMovies];
      });

      setPage(nextPage);
    }

    setIsLoading(false);
  }

  async function selectMovie (id) {
    const details = await fetchMovieDetails(id, apiKey);
    setSelectedMovie(details);
  };

  return { movies, selectedMovie, search, loadMore, selectMovie, setSelectedMovie };
}
