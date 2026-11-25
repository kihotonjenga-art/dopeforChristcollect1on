import { useEffect, useMemo, useState } from "react";

const categories = ["All", "Tees", "Hoodies", "Bottoms"];

function Icon({ name, size = 20 }) {
  const paths = {
    bag: <><path d="M5 8h14l1 13H4L5 8Z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></>,
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    menu: <><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></>,
    close: <><path d="m6 6 12 12" /><path d="M18 6 6 18" /></>,
    plus: <><path d="M12 5v14" /><path d="M5 12h14" /></>,
  };
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  );
}

function App() {
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    let active = true;
    fetch("/api/products/")
      .then((response) => {
        if (!response.ok) throw new Error("The product service is unavailable.");
        return response.json();
      })
      .then((data) => {
        if (active) setProducts(data.results);
      })
      .catch(() => {
        if (active) setError("We couldn't load the collection. Check that the Django API is running, then refresh.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const visibleProducts = useMemo(
    () => activeCategory === "All"
      ? products
      : products.filter((product) => product.category === activeCategory),
    [activeCategory, products],
  );

  function addToBag(product) {
    setCartCount((count) => count + 1);
    setNotice(`${product.name} added to your bag`);
    window.setTimeout(() => setNotice(""), 2400);
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <>
      <div className="announcement">
        <span>Faith in every thread</span>
        <span className="announcement-separator">✳</span>
        <span>Free delivery on orders over KES 5,000</span>
      </div>
      <header className="site-header">
        <a className="wordmark" href="#home" aria-label="DopeForChrist Collection home">
          <span className="wordmark-mark">DFC<span>®</span></span>
          <span className="wordmark-name">DOPEFORCHRIST <i>COLLECTION</i></span>
        </a>
        <nav className={menuOpen ? "main-nav is-open" : "main-nav"} aria-label="Main navigation">
          <a href="#collection" onClick={closeMenu}>Shop</a>
          <a href="#story" onClick={closeMenu}>Our story</a>
          <a href="#values" onClick={closeMenu}>Our values</a>
        </nav>
        <button className="bag-button" type="button" aria-label={`Shopping bag, ${cartCount} items`}>
          <Icon name="bag" />
          <span className="bag-label">Bag</span>
          <span className="bag-count">{cartCount}</span>
        </button>
        <button className="menu-toggle" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"}>
          <Icon name={menuOpen ? "close" : "menu"} />
        </button>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-line" /> Faith forward. Street ready.</p>
            <h1>Wear the<br />Word<span className="hero-period">.</span></h1>
            <p className="hero-description">More than what you wear. A reminder of who you are, wherever you go.</p>
            <a className="button button-dark" href="#collection">Shop the collection <Icon name="arrow" size={17} /></a>
            <div className="hero-note"><span className="note-star">✳</span><span>Made for purpose.<br />Worn with conviction.</span></div>
          </div>
          <div className="hero-image-wrap">
            <img className="hero-image" src="https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=1500&q=90" alt="Streetwear collection in a warm studio setting" />
            <div className="hero-image-tag"><span>THE NEW DROP</span><strong>WALK IN PURPOSE</strong></div>
            <div className="hero-index">01 <span /> 04</div>
          </div>
          <div className="hero-side-label">DOPEFORCHRIST COLLECTION · NAIROBI, KENYA</div>
        </section>

        <div className="verse-strip" id="values">
          <span className="strip-star">✳</span>
          <p>“Let all that you do be done in love.” <span>— 1 Corinthians 16:14</span></p>
          <span className="strip-star">✳</span>
          <span className="strip-caption">A little reminder, every day</span>
        </div>

        <section className="collection section-shell" id="collection">
          <div className="section-heading">
            <div>
              <p className="eyebrow"><span className="eyebrow-line" /> The collection</p>
              <h2>Everyday pieces.<br /><span>Everlasting meaning.</span></h2>
            </div>
            <p className="section-aside">Thoughtful fits, everyday comfort, and a message worth carrying.</p>
          </div>
          <div className="collection-toolbar">
            <div className="category-filters" aria-label="Filter products by category">
              {categories.map((category) => (
                <button key={category} className={activeCategory === category ? "filter-chip active" : "filter-chip"} onClick={() => setActiveCategory(category)}>
                  {category}
                </button>
              ))}
            </div>
            <span className="product-total">Showing {visibleProducts.length} pieces</span>
          </div>
          {error ? <div className="catalog-message error-message">{error}</div> : loading ? (
            <div className="catalog-message">Loading the collection<span className="loading-dots">...</span></div>
          ) : visibleProducts.length ? (
            <div className="product-grid">
              {visibleProducts.map((product, index) => (
                <article className="product-card" key={product.id}>
                  <div className="product-photo-wrap">
                    <img className="product-photo" src={product.image} alt={product.image_alt} loading="lazy" />
                    {product.badge && <span className="product-badge">{product.badge}</span>}
                    <button className="quick-add" type="button" onClick={() => addToBag(product)} aria-label={`Add ${product.name} to bag`}>
                      <Icon name="plus" size={19} />
                    </button>
                    <span className="product-number">0{index + 1}</span>
                  </div>
                  <div className="product-info">
                    <div><p className="product-category">{product.category}</p><h3>{product.name}</h3></div>
                    <p className="product-price">KES {product.price.toLocaleString("en-KE")}</p>
                  </div>
                </article>
              ))}
            </div>
          ) : <div className="catalog-message">No pieces in this category just yet.</div>}
          <div className="collection-footnote"><span>✳</span> Demo prices and photography — your collection is coming soon.</div>
        </section>

        <section className="story" id="story">
          <div className="story-image-wrap">
            <img src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=85" alt="Streetwear style with a confident, expressive look" loading="lazy" />
            <span className="story-stamp">FAITH<br />OVER<br />FEAR <i>✳</i></span>
          </div>
          <div className="story-copy">
            <p className="eyebrow"><span className="eyebrow-line" /> More than a label</p>
            <h2>Put your<br />faith <span>on.</span></h2>
            <p>DopeForChrist Collection is for the ones who walk with purpose and wear their faith out loud. We believe what you wear can start a conversation, share a little hope, and remind you to keep going.</p>
            <a className="text-link" href="mailto:dopeforchrist@gmail.com">Get to know us <Icon name="arrow" size={17} /></a>
            <div className="story-signoff">Made with faith in Nairobi, Kenya <span>✳</span></div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <a className="footer-brand" href="#home">DFC<span>®</span></a>
        <p>Faith in every thread. © 2026 DopeForChrist Collection</p>
        <div className="footer-links"><a href="https://www.instagram.com/dopeforchristcollections/" target="_blank" rel="noreferrer">Instagram ↗</a><a href="https://wa.me/254794933970" target="_blank" rel="noreferrer">WhatsApp ↗</a></div>
      </footer>
      {notice && <div className="toast" role="status">{notice}</div>}
    </>
  );
}

export default App;
