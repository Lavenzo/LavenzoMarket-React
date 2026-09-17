import { useState } from 'react';
import Header from './components/Header';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('home'); // 'home', 'products', 'product_details'
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('');
  const [selectedProductId, setSelectedProductId] = useState(null);

  const handleNavigate = (view, category = '') => {
    if (view !== 'products') {
      setSearchQuery('');
    }
    setActiveCategory(category);
    setCurrentView(view);
    window.scrollTo(0, 0);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== '') {
      setCurrentView('products');
      setActiveCategory('All Products'); // Reset category when searching globally
    }
  };

  const handleViewProduct = (productId) => {
    setSelectedProductId(productId);
    setCurrentView('product_details');
    window.scrollTo(0, 0);
  };

  return (
    <div className="app-container">
      <Header
        onNavigate={handleNavigate}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearchSubmit={handleSearchSubmit}
      />

      <main>
        {currentView === 'home' && (
          <Home
            onNavigate={handleNavigate}
            onViewProduct={handleViewProduct}
          />
        )}

        {currentView === 'products' && (
          <Products
            category={activeCategory}
            onCategoryChange={setActiveCategory}
            searchQuery={searchQuery}
            onSearchQueryChange={setSearchQuery}
            onViewProduct={handleViewProduct}
          />
        )}

        {currentView === 'product_details' && (
          <ProductDetails
            productId={selectedProductId}
            onBack={() => setCurrentView('products')}
          />
        )}
      </main>

      <footer style={{ textAlign: 'center', padding: '2rem', borderTop: '1px solid var(--border-color)', marginTop: 'auto', color: 'var(--text-light)' }}>
        <p>&copy; {new Date().getFullYear()} Lavenzo Market. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
