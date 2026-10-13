import { Link } from "react-router-dom";

function CategoryCard({ name, image }) {
  return (
    <Link
      to={`/shop?category=${name.toLowerCase()}`}
      className="category-card"
    >
      <img src={image} alt={name} />

      <div className="category-overlay">
        <h3>{name}</h3>

        <span>
          Explore
          <i className="bi bi-arrow-right ms-2"></i>
        </span>
      </div>
    </Link>
  );
}

export default CategoryCard;