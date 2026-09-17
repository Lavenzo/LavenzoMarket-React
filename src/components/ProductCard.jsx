export default function ProductCard({ product, onViewProduct }) {
  const getStockStatus = (stock) => {
    if (stock === 0) return { label: 'Out of Stock', className: 'text-danger' };
    if (stock <= 10) return { label: 'Low Stock', className: 'text-warning' };
    return { label: 'In Stock', className: 'text-success' };
  };

  const stockStatus = getStockStatus(product.stock);

  return (
    <article className="product-card">
      <img
        src={product.image}
        alt={product.name}
        className="product-image"
        loading="lazy"
      />
      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <h3 className="product-name">{product.name}</h3>

        <div className="product-meta">
          <span className="product-price">${product.price.toFixed(2)}</span>
          <span className="product-rating" aria-label={`Rating: ${product.rating} out of 5`}>
            ★ {product.rating}
          </span>
        </div>

        <div className={`product-stock ${stockStatus.className}`}>
          {stockStatus.label}
        </div>

        <button
          onClick={() => onViewProduct(product.id)}
          aria-label={`View details for ${product.name}`}
        >
          View Product
        </button>
      </div>
    </article>
  );
}
