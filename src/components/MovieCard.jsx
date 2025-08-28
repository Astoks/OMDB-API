export default function MovieCard({ movie, onClick }) {
  return (
    <div className="movie-card" onClick={() => onClick(movie.imdbID)}>
      <img
        className="movie-poster"
        src={movie.Poster && movie.Poster !== "N/A" ? movie.Poster : "/images/no-image.png"}
        alt={movie.Title}
        onError={(e) => e.target.src = "/images/no-image.png"}
      />
      <div className="movie-info">
        <div className="movie-title">{movie.Title}</div>
        <div className="movie-year">{movie.Year}</div>
      </div>
    </div>
  );
}