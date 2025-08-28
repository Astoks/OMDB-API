export async function fetchMovies(query, page = 1, apiKey) {
  if (!query.trim()) return [];
  const res = await fetch(
    `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(query)}&type=movie&page=${page}`
  );
  const data = await res.json();
  console.log("Fetching:", query, "page:", page, "results:", data.Search?.length);
  return data.Response === "True" ? data.Search : [];
}

export async function fetchMovieDetails(id, apiKey) {
  const res = await fetch(
    `https://www.omdbapi.com/?apikey=${apiKey}&i=${id}&plot=full`
  );
  const data = await res.json();
  return data.Response === "True" ? data : null;
}
