
import MovieCard from './MovieCard';

export default function MovieList({ movies, fetchMovieDetails, loading, error }) {
  return (
    <>
      {loading && (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading</p>
        </div>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
      
      
        {!loading && movies.length === 0 ? (
          <p style={{textAlign: "center"}}>No movies yet</p>
        ) : (
          <div className="results-grid">
            {movies.map((movie, index) => (
              <MovieCard key={`${movie.imdbID}-${index}`} movie={movie} onClick={fetchMovieDetails} />
            ))}
          </div>
        )}
      
    </>
  );
}
