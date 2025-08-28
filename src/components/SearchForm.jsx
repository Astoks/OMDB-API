export default function SearchForm({ query, setQuery, handleSubmit }) {
  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="search-input"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search movies..."
      />
      <button type="submit" className="search-button">Search</button>
    </form>
  );
}