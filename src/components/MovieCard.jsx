import React from 'react';

export default function MovieCard({ movie, onClick }) {
  return (
    <div className="movie-card" onClick={() => onClick(movie.imdbID)}>
      <img
        className="movie-poster"
        src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x445?text=No+Image"}
        alt={movie.Title}
      />
      <div className="movie-info">
        <div className="movie-title">{movie.Title}</div>
        <div className="movie-year">{movie.Year}</div>
        {movie.Ratings?.[0] && (
          <p className="movie-rating">
            ⭐ {movie.Ratings[0].Source}: {movie.Ratings[0].Value}
          </p>
        )}
      </div>
    </div>
  );
}