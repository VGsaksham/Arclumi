import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { customSmoothScroll } from '../utils';
import { client, urlFor } from '../lib/sanity';
import './ProductsPage.css';

const categories = ['indoor', 'facade', 'landscape', 'speciality products'];

const ProductsPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialCategory = queryParams.get('category') || categories[0];

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [catalogues, setCatalogues]         = useState([]);
  const [filteredCatalogues, setFiltered]   = useState([]);
  const [selectedCatalogue, setSelected]    = useState(null);
  const [loading, setLoading]               = useState(true);
  const cataloguesRef = useRef(null);

  /* ── Fetch: handle both old references and new inline objects ── */
  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await client.fetch(`*[_type == "catalogue"]{
          ...,
          products[]{
            _type == 'reference' => @->,
            _type != 'reference' => @
          }
        }`);
        setCatalogues(data);
      } catch (e) {
        console.error('Fetch error:', e);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  useEffect(() => {
    const cat = new URLSearchParams(location.search).get('category');
    if (cat && categories.includes(cat)) {
      setActiveCategory(cat);
      setTimeout(() => {
        if (cataloguesRef.current) {
          const y = cataloguesRef.current.getBoundingClientRect().top + window.pageYOffset - 80;
          customSmoothScroll(y, 1500);
        }
      }, 600);
    }
  }, [location.search, location.state?.trigger]);

  useEffect(() => {
    setFiltered(catalogues.filter(c => c.category === activeCategory));
  }, [activeCategory, catalogues]);

  useEffect(() => {
    document.body.style.overflow = selectedCatalogue ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selectedCatalogue]);

  return (
    <div className="products-page">
      {/* Hero */}
      <div className="products-hero">
        <div className="products-hero-bg"></div>
        <div className="products-hero-overlay"></div>
        <div className="products-hero-content">
          <h1 className="products-hero-title">OUR PRODUCTS</h1>
          <h3 className="products-hero-subtitle">explore our specialized catalogues</h3>
        </div>
        <div className="hero-scroll-down" onClick={() => {
          const y = cataloguesRef.current.getBoundingClientRect().top + window.pageYOffset - 80;
          customSmoothScroll(y, 1200);
        }} />
      </div>

      {/* Catalogue grid */}
      <div className="catalogues-section" ref={cataloguesRef}>
        <div className="catalogues-header">
          <h2 className="catalogues-category-title">
            <span className="showing-label">showing:</span> {activeCategory}
          </h2>
        </div>
        <div className="zoom-boxes-grid">
          {filteredCatalogues.map((cat, i) => (
            <div key={cat._id} className="zoom-box"
              onClick={() => setSelected(cat)}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="zoom-box-img-wrapper">
                {cat.images?.filter(img => img?.asset)?.[0]
                  ? <img src={urlFor(cat.images.filter(img => img?.asset)[0]).width(600).auto('format').quality(80).url()} alt={cat.title} className="zoom-box-img" />
                  : <div className="zoom-box-img placeholder-img" />}
              </div>
              <div className="zoom-box-info">
                <h3 className="zoom-box-title">{cat.title}</h3>
                <p className="zoom-box-desc">{cat.desc}</p>
              </div>
            </div>
          ))}
          {!loading && filteredCatalogues.length === 0 &&
            <div className="no-catalogues"><p>No catalogues yet.</p></div>}
          {loading && <div className="loading-catalogues">Loading…</div>}
        </div>
      </div>

      {selectedCatalogue && (
        <BrowseShowroom catalogue={selectedCatalogue} onClose={() => setSelected(null)} />
      )}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   DUAL-ROW FLOATING SHOWROOM
   A sophisticated dual-track horizontal scroll experience
═══════════════════════════════════════════════════════════════ */
const BrowseShowroom = ({ catalogue, onClose }) => {
  const products = catalogue.products || [];
  
  const topRowProducts = products.filter((_, i) => i % 2 === 0);
  const bottomRowProducts = products.filter((_, i) => i % 2 !== 0);

  const overlayRef = useRef(null);
  const topTrackRef = useRef(null);
  const bottomTrackRef = useRef(null);
  const rafRef = useRef(null);

  const handleScroll = (e) => {
    const overlay = e.currentTarget;
    if (!topTrackRef.current || !bottomTrackRef.current) return;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    rafRef.current = requestAnimationFrame(() => {
      const scrollY = overlay.scrollTop;
      const maxScroll = overlay.scrollHeight - overlay.clientHeight;

      if (maxScroll > 0) {
        const scrollProgress = scrollY / maxScroll;
        
        const topMaxTranslate = topTrackRef.current.scrollWidth - window.innerWidth + 200;
        // Provide fallback max translate for bottom track in case it's empty
        const bottomMaxTranslate = Math.max(0, bottomTrackRef.current.scrollWidth - window.innerWidth + 200);

        const topTranslate = scrollProgress * topMaxTranslate;
        const bottomTranslate = bottomMaxTranslate - (scrollProgress * bottomMaxTranslate);

        topTrackRef.current.style.transform = `translate3d(-${topTranslate}px, 0, 0)`;
        bottomTrackRef.current.style.transform = `translate3d(-${bottomTranslate}px, 0, 0)`;
      }
    });
  };

  useEffect(() => {
    if (overlayRef.current) {
      overlayRef.current.scrollTop = 0;
      setTimeout(() => {
        if (bottomTrackRef.current) {
          const bottomMaxTranslate = Math.max(0, bottomTrackRef.current.scrollWidth - window.innerWidth + 200);
          bottomTrackRef.current.style.transform = `translate3d(-${bottomMaxTranslate}px, 0, 0)`;
        }
      }, 50);
    }
  }, []);

  const spacerHeight = Math.max(100, products.length * 20) + 'vh';

  const renderProduct = (product, i) => {
    const mainImg = (product.images || []).filter(img => img?.asset)[0];
    return (
      <div key={product._key || i} className="floating-panel">
        <div className="floating-img-wrapper">
          {mainImg ? (
            <img src={urlFor(mainImg).width(400).auto('format').quality(80).url()} alt={product.name} className="floating-img" />
          ) : null}
        </div>
        <div className="floating-meta">
          <span className="floating-index">{(i + 1).toString().padStart(2, '0')}</span>
          <h3 className="floating-name">{product.name}</h3>
        </div>
      </div>
    );
  };

  return (
    <div className="floating-showroom" ref={overlayRef} onScroll={handleScroll}>
      <div className="floating-spacer" style={{ height: spacerHeight }}>
        <div className="floating-sticky">
          
          <div className="browse-topbar">
            <button className="browse-back-btn" onClick={onClose}>
              <span className="browse-back-arrow" />
              <span>Back</span>
            </button>
            <span className="browse-catalogue-name">{catalogue.title}</span>
            <span className="browse-catalogue-count">{products.length} products</span>
          </div>

          {products.length === 0 ? (
            <div className="browse-empty">No products in this catalogue yet.</div>
          ) : (
            <div className="floating-tracks-container">
              <div className="floating-track top-track" ref={topTrackRef}>
                {topRowProducts.map((p, i) => renderProduct(p, i * 2))}
              </div>
              <div className="floating-track bottom-track" ref={bottomTrackRef}>
                {bottomRowProducts.map((p, i) => renderProduct(p, i * 2 + 1))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
