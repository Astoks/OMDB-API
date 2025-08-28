import { useState } from 'react';
import { fetchMovies, fetchMovieDetails } from '../utils/api';

export function useMovies(apiKey) {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false); //Ξεχωριστο, για να μην εμφανιζεται το loading
  const [error, setError] = useState(null);

  async function search(newQuery) {
    if (!newQuery.trim()) return;

    try {
      setLoading(true);
      setError(null);
      setQuery(newQuery);
      setPage(1);

      const results = await fetchMovies(newQuery, 1, apiKey);
      setMovies(results || []);
    } catch (err) {
      setError("Something went wrong while fetching movies.");
    } finally {
      setLoading(false);
    }
  }

  async function loadMore() {
    if (loadingMore || !query) return;

    try {
      setLoadingMore(true);
      setError(null);

      const nextPage = page + 1;
      const results = await fetchMovies(query, nextPage, apiKey);

      if (results?.length) {
        const uniqueResults = results.filter(
          movie => !movies.some(m => m.imdbID === movie.imdbID)
        );
        setMovies(prev => [...prev, ...uniqueResults]);
        setPage(nextPage);
      }
    } catch (err) {
      setError("Something went wrong while loading more movies.");
    } finally {
      setLoadingMore(false);
    }
  }

  async function selectMovie(id) {
    try {
      setLoading(true);
      const details = await fetchMovieDetails(id, apiKey);
      setSelectedMovie(details);
    } catch (err) {
      setError("Could not fetch movie details.");
    } finally {
      setLoading(false);
    }
  }

  return {
    movies,
    selectedMovie,
    loading,
    error,
    search,
    loadMore,
    selectMovie,
    setSelectedMovie
  };
}
