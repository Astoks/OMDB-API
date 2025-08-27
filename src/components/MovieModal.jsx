import React from 'react';

export default function MovieModal({ movie, close }) {
  
  if (!movie) return null;
  
  return (
    <div className='modal' onClick={close}>
      <div className='modal-content' onClick={(e) => e.stopPropagation()}>
        <button className='close-btn' onClick={close}>X</button>
        <h2>{movie.Title} ({movie.Year})</h2>
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x445?text=No+Image"}
          alt={movie.Title}
        />
        <p><strong>Genre:</strong> {movie.Genre}</p>
        <p><strong>Director:</strong> {movie.Director}</p>
        <p><strong>Actors:</strong> {movie.Actors}</p>
        <p><strong>Plot:</strong> {movie.Plot}</p>

        {movie.Ratings && movie.Ratings.length > 0 && (
          <div className="movie-ratings">
            <h3>Ratings</h3>
            <ul>
              {movie.Ratings.map((r, idx) => (
                <li key={idx}>
                  <b>{r.Source}:</b> {r.Value}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
