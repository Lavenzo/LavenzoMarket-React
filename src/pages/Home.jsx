import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

export default function Home({ onNavigate, onViewProduct }) {
  const categories = ['Clothing', 'Food & Drinks', 'Electronics', 'Home & Living'];

  // Get 4 featured products (e.g., highest rated, one from each category if possible, or just the top 4)
  const featuredProducts = [...products]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

  return (
    <div className="container">
      <section className="hero-section">
        <h1>Lavenzo Market</h1>
        <p>Everything you need, all in one place.</p>
        <button
          className="hero-button"
          onClick={() => onNavigate('products')}
        >
          Shop Now
        </button>
      </section>

      <section className="categories-section" aria-labelledby="categories-heading">
        <h2 id="categories-heading" className="section-title">Shop by Category</h2>
        <div className="category-grid">
          {categories.map(category => (
            <div
              key={category}
              className="category-card"
              onClick={() => onNavigate('products', category)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && onNavigate('products', category)}
            >
              <h3>{category}</h3>
            </div>
          ))}
        </div>
      </section>

      <section className="featured-section" aria-labelledby="featured-heading">
        <h2 id="featured-heading" className="section-title">Featured Products</h2>
        <div className="products-grid">
          {featuredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onViewProduct={onViewProduct}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
