
import MovieCard from './MovieCard';

export default function MovieList({ movies, fetchMovieDetails }) {
  
  if (!movies || movies.length === 0) {
    return <p>No movies yet</p>;
  }
  
  return (
    <div className="results-grid">
      {movies.map(movie => (
        <MovieCard key={movie.imdbID} movie={movie} onClick={fetchMovieDetails} />
      ))}
    </div>
  );
}

