export default function Header({
  onNavigate,
  searchQuery,
  onSearchChange,
  onSearchSubmit
}) {
  return (
    <header className="site-header">
      <div className="container header-content">
        <a
          href="#"
          className="logo-link"
          onClick={(e) => { e.preventDefault(); onNavigate('home'); }}
        >
          Lavenzo Market
        </a>

        <nav className="main-nav" aria-label="Main navigation">
          <ul>
            <li>
              <button onClick={() => onNavigate('home')}>Home</button>
            </li>
            <li>
              <button onClick={() => onNavigate('products', 'Clothing')}>Clothing</button>
            </li>
            <li>
              <button onClick={() => onNavigate('products', 'Food & Drinks')}>Food & Drinks</button>
            </li>
            <li>
              <button onClick={() => onNavigate('products', 'Electronics')}>Electronics</button>
            </li>
            <li>
              <button onClick={() => onNavigate('products', 'Home & Living')}>Home & Living</button>
            </li>
          </ul>
        </nav>

        <div className="header-actions">
          <form className="search-form" onSubmit={onSearchSubmit} role="search">
            <label htmlFor="search-input" className="sr-only" style={{display: 'none'}}>Search products</label>
            <input
              id="search-input"
              type="search"
              className="search-input"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
            <button type="submit" className="search-button">Search</button>
          </form>

          <button className="icon-button" aria-label="My Account">
            Account
          </button>

          <button className="icon-button" aria-label="Shopping Cart">
            Cart (0)
          </button>
        </div>
      </div>
    </header>
  );
}
