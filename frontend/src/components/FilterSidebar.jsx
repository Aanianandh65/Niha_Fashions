
function FilterSidebar({
  category,
  setCategory,
  maxPrice,
  setMaxPrice,
  rating,
  setRating,
}) {
  return (
    <div className="filter-sidebar">

      <div className="filter-header">
        <h5>FILTERS</h5>

        <button
          className="clear-filter"
          onClick={() => {
            setCategory("All");
            setMaxPrice(6000);
            setRating(0);
          }}
        >
          Clear All
        </button>
      </div>

      <div className="filter-group">

        <h6>Category</h6>

        {[
          "All",
          "Women",
          "Men",
          "Kids",
          "Accessories",
          "Footwear",
          "Summer",
          "Winter",
          "Party Wear",
          "Casual",
          "Luxury",
          "Trending",
        ].map((item) => (
          <label key={item} className="filter-option">

            <input
              type="radio"
              name="category"
              checked={category === item}
              onChange={() => setCategory(item)}
            />

            <span>{item}</span>

          </label>
        ))}

      </div>

      <div className="filter-group">

        <h6>Maximum Price</h6>

        <input
          type="range"
          min="500"
          max="6000"
          step="100"
          value={maxPrice}
          onChange={(e) =>
            setMaxPrice(Number(e.target.value))
          }
          className="form-range"
        />

        <div className="price-range">
          <span>₹500</span>
          <strong>₹{maxPrice}</strong>
        </div>

      </div>


      <div className="filter-group">

        <h6>Rating</h6>

        {[5, 4, 3, 2].map((value) => (
          <label
            key={value}
            className="filter-option"
          >

            <input
              type="radio"
              name="rating"
              checked={rating === value}
              onChange={() => setRating(value)}
            />

            <span className="rating-filter">
              {"★".repeat(value)}
              <small>& up</small>
            </span>

          </label>
        ))}

      </div>

    </div>
  );
}

export default FilterSidebar;