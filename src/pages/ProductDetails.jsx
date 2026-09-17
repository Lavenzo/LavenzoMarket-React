import { products } from '../data/products';

export default function ProductDetails({ productId, onBack }) {
  const product = products.find(p => p.id === productId);

  if (!product) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '4rem 0' }}>
        <h2>Product not found</h2>
        <p>The product you are looking for does not exist or has been removed.</p>
        <button onClick={onBack} style={{ marginTop: '1rem' }}>Back to Products</button>
      </div>
    );
  }

  const getStockStatus = (stock) => {
    if (stock === 0) return { label: 'Out of Stock', className: 'text-danger' };
    if (stock <= 10) return { label: 'Low Stock', className: 'text-warning' };
    return { label: 'In Stock', className: 'text-success' };
  };

  const stockStatus = getStockStatus(product.stock);

  return (
    <div className="container">
      <button className="back-button" onClick={onBack}>
        &larr; Back to Products
      </button>

      <article className="product-details">
        <div>
          <img
            src={product.image}
            alt={product.name}
            className="details-image"
          />
        </div>

        <div className="details-info">
          <span className="details-category">{product.category}</span>
          <h1 className="details-name">{product.name}</h1>

          <div className="details-meta">
            <span className="details-price">${product.price.toFixed(2)}</span>
            <span aria-label={`Rating: ${product.rating} out of 5`} style={{ color: 'var(--warning)' }}>
              ★ {product.rating}
            </span>
          </div>

          <p className="details-id">Product ID: {product.id}</p>

          <div className="details-description">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>

          <div className={`details-stock ${stockStatus.className}`}>
            Status: {stockStatus.label} ({product.stock} available)
          </div>

          <button
            disabled={product.stock === 0}
            style={{
              opacity: product.stock === 0 ? 0.5 : 1,
              cursor: product.stock === 0 ? 'not-allowed' : 'pointer'
            }}
          >
            Add to Cart
          </button>
        </div>
      </article>
    </div>
  );
}
