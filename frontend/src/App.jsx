import { useEffect, useMemo, useState } from "react";

const categories = ["All", "Tees", "Hoodies", "Bottoms"];
const whatsappNumber = "254794933970";
const standardSizes = ["S", "M", "L", "XL"];
const sizeLabels = { S: "Small", M: "Medium", L: "Large", XL: "Extra Large" };
const previewProducts = [
  {
    id: 1,
    name: "Milele graphic tee",
    category: "Tees",
    price: 1500,
    sizes: standardSizes,
    badge: "Best seller",
    image: "/products/milele-graphic-tee-front.jpeg",
    image_alt: "Black graphic tee with blue MILELE lettering on the front",
    back_image: "/products/milele-graphic-tee-back.jpeg",
    back_image_alt: "Black graphic tee with Mwana wa Yesu and dove print on the back",
  },
  {
    id: 2,
    name: "Walk by Faith hoodie",
    category: "Hoodies",
    price: 4800,
    sizes: standardSizes,
    badge: "New drop",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=85",
    image_alt: "Relaxed fit hoodie",
    back_image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=85",
    back_image_alt: "Demo back-view image for hoodie",
  },
  {
    id: 3,
    name: "Maono graphic tee",
    category: "Tees",
    price: 1500,
    sizes: standardSizes,
    badge: "",
    image: "/products/maono-graphic-tee-front.jpeg",
    image_alt: "Red graphic tee with white MAONO lettering",
    back_image: "/products/maono-graphic-tee-back.jpeg",
    back_image_alt: "Red graphic tee with KUJA KWA YESU KUNA URADI print on the back",
  },
  {
    id: 4,
    name: "Eternal graphic tee",
    category: "Tees",
    price: 1500,
    sizes: standardSizes,
    badge: "New drop",
    image: "/products/eternal-graphic-tee-front.jpeg",
    image_alt: "White graphic tee with blue ETERNAL lettering on the front",
    back_image: "/products/eternal-graphic-tee-back.jpeg",
    back_image_alt: "White tee with blue He Was Brought to Earth to Give Us Eternal Life print on the back",
  },
  {
    id: 5,
    name: "Visions graphic tee",
    category: "Tees",
    price: 1500,
    sizes: standardSizes,
    badge: "New drop",
    image: "/products/visions-graphic-tee-front.jpeg",
    image_alt: "White graphic tee with black VISIONS lettering on the front",
    back_image: "/products/visions-graphic-tee-back.jpeg",
    back_image_alt: "White tee with Kenya, Nairobi, and Proverbs 29:18 print on the back",
  },
  {
    id: 6,
    name: "Visions green graphic tee",
    category: "Tees",
    price: 1500,
    sizes: standardSizes,
    badge: "New drop",
    image: "/products/visions-green-graphic-tee-front.jpeg",
    image_alt: "Green graphic tee with yellow VISIONS lettering on the front",
    back_image: "/products/visions-green-graphic-tee-back.jpeg",
    back_image_alt: "Green graphic tee with GOD GAVE ME THOSE VISIONS print on the back",
  },
  {
    id: 7,
    name: "Milele and Maombi graphic tee",
    category: "Tees",
    price: 1500,
    sizes: standardSizes,
    badge: "New drop",
    image: "/products/milele-maombi-graphic-tee-front.jpeg",
    image_alt: "White graphic tee with red MILELE lettering on the front",
    back_image: "/products/milele-maombi-graphic-tee-back.jpeg",
    back_image_alt: "White graphic tee with MAOMBI prayer illustration on the back",
  },
  {
    id: 8,
    name: "Kuja Kwa Yesu graphic tee",
    category: "Tees",
    price: 1500,
    sizes: standardSizes,
    badge: "New drop",
    image: "/products/kuja-kwa-yesu-tee-front.jpeg",
    image_alt: "Charcoal tee with gold MILELE lettering and stars on the front",
    back_image: "/products/kuja-kwa-yesu-tee-back.jpeg",
    back_image_alt: "Charcoal tee with gold KUJA KWA YESU lettering on the back",
  },
];

function Icon({ name, size = 20 }) {
  const paths = {
    bag: <><path d="M5 8h14l1 13H4L5 8Z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></>,
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    menu: <><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></>,
    close: <><path d="m6 6 12 12" /><path d="M18 6 6 18" /></>,
    plus: <><path d="M12 5v14" /><path d="M5 12h14" /></>,
    minus: <path d="M5 12h14" />,
    rotate: <><path d="M20 7v5h-5" /><path d="M4 17v-5h5" /><path d="M5.6 9A7 7 0 0 1 17.5 6L20 12" /><path d="M18.4 15A7 7 0 0 1 6.5 18L4 12" /></>,
  };
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  );
}

function formatSize(size) {
  return `${sizeLabels[size] || size} (${size})`;
}

function App() {
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [cart, setCart] = useState({});
  const [selectedSizes, setSelectedSizes] = useState({});
  const [cartOpen, setCartOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [usingPreview, setUsingPreview] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const [flippedProducts, setFlippedProducts] = useState({});

  useEffect(() => {
    let active = true;
    fetch("/api/products/")
      .then((response) => {
        if (!response.ok) throw new Error("The product service is unavailable.");
        return response.json();
      })
      .then((data) => {
        if (active) setProducts(Array.isArray(data.results) ? data.results : previewProducts);
      })
      .catch(() => {
        if (active) {
          setProducts(previewProducts);
          setUsingPreview(true);
        }
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
  const cartItems = useMemo(
    () => {
      const productsById = new Map(products.map((product) => [String(product.id), product]));
      return Object.entries(cart).flatMap(([key, quantity]) => {
        const separator = key.lastIndexOf(":");
        const product = productsById.get(key.slice(0, separator));
        if (!product) return [];
        return [{
          ...product,
          size: key.slice(separator + 1),
          cartKey: key,
          quantity,
        }];
      });
    },
    [cart, products],
  );
  const cartCount = Object.values(cart).reduce((total, quantity) => total + quantity, 0);
  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  function addToBag(product) {
    const size = selectedSizes[product.id];
    if (!size) {
      setNotice(`Choose a size for ${product.name} first`);
      window.setTimeout(() => setNotice(""), 2400);
      return;
    }
    const key = `${product.id}:${size}`;
    setCart((items) => ({ ...items, [key]: (items[key] || 0) + 1 }));
    setNotice(`${product.name} (${size}) added to your bag`);
    window.setTimeout(() => setNotice(""), 2400);
  }

  function toggleProductSide(productId) {
    setFlippedProducts((flipped) => ({ ...flipped, [productId]: !flipped[productId] }));
  }

  function changeQuantity(cartItemKey, amount) {
    setCart((items) => {
      const quantity = (items[cartItemKey] || 0) + amount;
      if (quantity <= 0) {
        const nextItems = { ...items };
        delete nextItems[cartItemKey];
        return nextItems;
      }
      return { ...items, [cartItemKey]: quantity };
    });
  }

  function getWhatsAppOrderUrl() {
    const lines = cartItems.map((item) =>
      `${item.name} — Size: ${formatSize(item.size)} x${item.quantity} — KES ${(item.price * item.quantity).toLocaleString("en-KE")}`,
    );
    const message = [
      "Hello DopeForChrist Collection, I'd like to place this order:",
      "",
      ...lines,
      "",
      `Total: KES ${cartTotal.toLocaleString("en-KE")}`,
    ].join("\n");
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
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
        <button className="bag-button" type="button" onClick={() => setCartOpen(true)} aria-label={`Shopping bag, ${cartCount} items`}>
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
          {loading ? (
            <div className="catalog-message">Loading the collection<span className="loading-dots">...</span></div>
          ) : visibleProducts.length ? (
            <div className="product-grid">
              {visibleProducts.map((product, index) => (
                <article className="product-card" key={product.id}>
                  <div className="product-photo-wrap">
                    <div className={`product-image-flip${flippedProducts[product.id] ? " is-flipped" : ""}`}>
                      <div className="product-flip-face product-flip-front" aria-hidden={Boolean(flippedProducts[product.id])}>
                        <img className="product-photo" src={product.image} alt={product.image_alt} loading="lazy" />
                      </div>
                      {product.back_image && (
                        <div className="product-flip-face product-flip-back" aria-hidden={!flippedProducts[product.id]}>
                          <img className="product-photo" src={product.back_image} alt={product.back_image_alt || `Back view of ${product.name}`} loading="lazy" />
                        </div>
                      )}
                    </div>
                    {product.badge && <span className="product-badge">{product.badge}</span>}
                    {product.back_image && (
                      <button className="view-side-button" type="button" onClick={() => toggleProductSide(product.id)} aria-pressed={Boolean(flippedProducts[product.id])} aria-label={`${flippedProducts[product.id] ? "Show front" : "Show back"} of ${product.name}`}>
                        <Icon name="rotate" size={15} />
                        {flippedProducts[product.id] ? "See front" : "See back"}
                      </button>
                    )}
                    <button className="quick-add" type="button" onClick={() => addToBag(product)} aria-label={`Add ${product.name} to bag`}>
                      <Icon name="plus" size={19} />
                    </button>
                    <span className="product-number">0{index + 1}</span>
                  </div>
                  <div className="product-info">
                    <div><p className="product-category">{product.category}</p><h3>{product.name}</h3></div>
                    <p className="product-price">KES {product.price.toLocaleString("en-KE")}</p>
                  </div>
                  <div className="size-picker">
                    <span className="size-picker-label" id={`size-label-${product.id}`}>Choose size</span>
                    <div className="size-options" role="group" aria-labelledby={`size-label-${product.id}`}>
                      {(product.sizes?.length ? product.sizes : standardSizes).map((size) => (
                        <button
                          key={size}
                          className={selectedSizes[product.id] === size ? "size-option selected" : "size-option"}
                          type="button"
                          aria-label={`${sizeLabels[size] || size} (${size})`}
                          aria-pressed={selectedSizes[product.id] === size}
                          onClick={() => setSelectedSizes((selected) => ({ ...selected, [product.id]: size }))}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : <div className="catalog-message">No pieces in this category just yet.</div>}
          <div className="collection-footnote"><span>✳</span> {usingPreview ? "Preview catalog (API offline) · Demo images — replace with your actual front and back photos." : "Demo prices and photography — replace with your actual front and back product images."}</div>
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
        <div className="footer-links"><a href="https://www.instagram.com/dopeforchristcollections/" target="_blank" rel="noreferrer">Instagram ↗</a></div>
      </footer>
      {cartOpen && (
        <div className="cart-overlay" onClick={() => setCartOpen(false)}>
          <aside className="cart-panel" role="dialog" aria-modal="true" aria-labelledby="cart-title" onClick={(event) => event.stopPropagation()}>
            <div className="cart-header">
              <div><p className="eyebrow"><span className="eyebrow-line" /> Your selection</p><h2 id="cart-title">Your bag <span>({cartCount})</span></h2></div>
              <button className="cart-close" type="button" onClick={() => setCartOpen(false)} aria-label="Close cart"><Icon name="close" /></button>
            </div>
            {cartItems.length ? (
              <>
                <div className="cart-items">
                  {cartItems.map((item) => (
                    <article className="cart-item" key={item.cartKey}>
                      <img src={item.image} alt={item.image_alt} />
                      <div className="cart-item-details">
                        <p className="product-category">{item.category}</p>
                        <h3>{item.name}</h3>
                        <p className="cart-item-size">Size: {formatSize(item.size)}</p>
                        <p className="cart-item-price">KES {(item.price * item.quantity).toLocaleString("en-KE")}</p>
                        <div className="quantity-control" aria-label={`Quantity for ${item.name}, size ${item.size}`}>
                          <button type="button" onClick={() => changeQuantity(item.cartKey, -1)} aria-label={`Decrease ${item.name}, size ${item.size}`}><Icon name="minus" size={15} /></button>
                          <span>{item.quantity}</span>
                          <button type="button" onClick={() => changeQuantity(item.cartKey, 1)} aria-label={`Increase ${item.name}, size ${item.size}`}><Icon name="plus" size={15} /></button>
                        </div>
                      </div>
                      <button className="cart-remove" type="button" onClick={() => changeQuantity(item.cartKey, -item.quantity)} aria-label={`Remove ${item.name}, size ${item.size}`}>Remove</button>
                    </article>
                  ))}
                </div>
                <div className="cart-summary">
                  <div><span>Subtotal</span><strong>KES {cartTotal.toLocaleString("en-KE")}</strong></div>
                  <p>Delivery details can be confirmed when you message us.</p>
                  <a className="button button-dark whatsapp-order" href={getWhatsAppOrderUrl()} target="_blank" rel="noreferrer">
                    Order via WhatsApp <Icon name="arrow" size={17} />
                  </a>
                </div>
              </>
            ) : (
              <div className="cart-empty">
                <Icon name="bag" size={30} />
                <h3>Your bag is waiting.</h3>
                <p>Add a piece from the collection to get started.</p>
                <button className="button button-dark" type="button" onClick={() => setCartOpen(false)}>Continue shopping <Icon name="arrow" size={17} /></button>
              </div>
            )}
          </aside>
        </div>
      )}
      {notice && <div className="toast" role="status">{notice}</div>}
    </>
  );
}

export default App;
