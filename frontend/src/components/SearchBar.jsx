function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="shop-search">
      <i className="bi bi-search"></i>

      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {searchTerm && (
        <button onClick={() => setSearchTerm("")}>
          <i className="bi bi-x"></i>
        </button>
      )}
    </div>
  );
}

export default SearchBar;