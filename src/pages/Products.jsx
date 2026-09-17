import { useState } from 'react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

export default function Products({
  category,
  onCategoryChange,
  searchQuery,
  onSearchQueryChange,
  onViewProduct
}) {
  const [sortOrder, setSortOrder] = useState('default');

  const categories = ['All Products', 'Clothing', 'Food & Drinks', 'Electronics', 'Home & Living'];

  const handleClearFilters = () => {
    onSearchQueryChange('');
    onCategoryChange('All Products');
    setSortOrder('default');
  };

  let filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes((searchQuery || '').toLowerCase());
    const matchesCategory = (!category || category === 'All Products') ? true : product.category === category;
    return matchesSearch && matchesCategory;
  });

  if (sortOrder === 'price-asc') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortOrder === 'price-desc') {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortOrder === 'name-asc') {
    filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortOrder === 'name-desc') {
    filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
  }

  const displayCategory = !category || category === 'All Products' ? 'All Products' : category;

  return (
    <div className="container products-layout">
      <div className="filters-bar">
        <div className="filter-group">
          <label htmlFor="category-filter">Category:</label>
          <select
            id="category-filter"
            value={displayCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="sort-filter">Sort By:</label>
          <select
            id="sort-filter"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="default">Relevance</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Name: A-Z</option>
            <option value="name-desc">Name: Z-A</option>
          </select>
        </div>

        <button onClick={handleClearFilters} style={{ marginLeft: 'auto' }}>
          Clear Filters
        </button>
      </div>

      <div>
        <div className="products-header">
          <h2>{displayCategory}</h2>
          <span>{filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found</span>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="products-grid">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onViewProduct={onViewProduct}
              />
            ))}
          </div>
        ) : (
          <div className="no-products">
            <h3>No products found</h3>
            <p>Try adjusting your search or filters.</p>
            <button onClick={handleClearFilters}>Reset Filters</button>
          </div>
        )}
      </div>
    </div>
  );
}
