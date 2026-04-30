import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { customSmoothScroll } from '../utils';
import './ProductsPage.css';

const cataloguesData = [
  { 
    id: 1, 
    images: ['/prod_chandelier.png', '/prod_pendant.png'], 
    title: 'Architectural Downlights', 
    desc: 'Precision engineered recessed and surface mounted downlights.', 
    category: 'indoor',
    products: [
      { id: 101, name: 'Core Downlight 12W', img: ['/prod_linear.png', '/prod_chandelier.png'], specs: '12W / 3000K / 45° Beam' },
      { id: 102, name: 'Pro Downlight 24W', img: ['/prod_chandelier.png', '/prod_pendant.png'], specs: '24W / 4000K / 60° Beam' },
      { id: 103, name: 'Mini Adjustable 8W', img: ['/prod_pendant.png', '/prod_linear.png'], specs: '8W / 2700K / Adjustable' }
    ]
  },
  { 
    id: 2, 
    images: ['/prod_linear.png', '/prod_chandelier.png'], 
    title: 'Linear Systems', 
    desc: 'Continuous and modular linear lighting solutions.', 
    category: 'indoor',
    products: [
      { id: 201, name: 'Linea Surface', img: ['/prod_linear.png', '/prod_facade.png'], specs: 'Custom Length / Diffused' },
      { id: 202, name: 'Linea Recessed', img: ['/prod_chandelier.png', '/prod_linear.png'], specs: 'Custom Length / UGR<19' }
    ]
  },
  { 
    id: 3, 
    images: ['/prod_facade.png', '/prod_linear.png'], 
    title: 'Wall Washers', 
    desc: 'High-performance asymmetric optics.', 
    category: 'facade',
    products: [
      { id: 301, name: 'Facade Wash Pro', img: ['/prod_facade.png', '/prod_linear.png'], specs: '36W / IP65 / Asymmetric' },
      { id: 302, name: 'Facade Wash Mini', img: ['/prod_linear.png', '/prod_facade.png'], specs: '18W / IP65 / Asymmetric' }
    ]
  },
  { 
    id: 4, 
    images: ['/prod_facade.png', '/prod_linear.png'], 
    title: 'Media Facades', 
    desc: 'Dynamic, addressable pixel systems.', 
    category: 'facade',
    products: [
      { id: 401, name: 'Pixel Dot RGBW', img: ['/prod_facade.png', '/prod_pendant.png'], specs: '2W / IP67 / DMX512' },
      { id: 402, name: 'Pixel Bar RGBW', img: ['/prod_pendant.png', '/prod_facade.png'], specs: '15W/m / IP67 / DMX512' }
    ]
  },
  { 
    id: 5, 
    images: ['/prod_pendant.png', '/prod_chandelier.png'], 
    title: 'Pathway Bollards', 
    desc: 'Minimalist ground-mounted luminaires.', 
    category: 'landscape',
    products: [
      { id: 501, name: 'Bollard Round 600', img: ['/prod_pendant.png', '/prod_linear.png'], specs: '10W / 600mm Height / IP65' },
      { id: 502, name: 'Bollard Square 800', img: ['/prod_linear.png', '/prod_chandelier.png'], specs: '14W / 800mm Height / IP65' }
    ]
  },
  { 
    id: 6, 
    images: ['/prod_facade.png', '/prod_pendant.png'], 
    title: 'Tree Uplights', 
    desc: 'Buried and adjustable spots for canopies.', 
    category: 'landscape',
    products: [
      { id: 601, name: 'Inground Uplight', img: ['/prod_facade.png', '/prod_linear.png'], specs: '12W / Drive-over / IP67' },
      { id: 602, name: 'Spike Spotlight', img: ['/prod_pendant.png', '/prod_facade.png'], specs: '9W / Adjustable / IP65' }
    ]
  },
  { 
    id: 7, 
    images: ['/prod_chandelier.png', '/prod_pendant.png'], 
    title: 'Bespoke Chandeliers', 
    desc: 'Customizable suspended sculptures.', 
    category: 'indoor decorative',
    products: [
      { id: 701, name: 'Halo Suspension', img: ['/prod_chandelier.png', '/prod_pendant.png'], specs: 'Custom Diameter / 3000K' },
      { id: 702, name: 'Crystal Cascade', img: ['/prod_pendant.png', '/prod_chandelier.png'], specs: 'Custom Drops / 2700K' }
    ]
  },
  { 
    id: 8, 
    images: ['/prod_pendant.png', '/prod_linear.png'], 
    title: 'Minimalist Pendants', 
    desc: 'Sleek, geometric suspension lights.', 
    category: 'indoor decorative',
    products: [
      { id: 801, name: 'Cylinder Pendant', img: ['/prod_pendant.png', '/prod_chandelier.png'], specs: '8W / 50mm Dia / Matt Black' },
      { id: 802, name: 'Cone Pendant', img: ['/prod_chandelier.png', '/prod_pendant.png'], specs: '12W / Brass Finish' }
    ]
  },
  { 
    id: 9, 
    images: ['/prod_facade.png', '/prod_linear.png'], 
    title: 'Outdoor Sconces', 
    desc: 'Weather-proof, architecturally integrated wall lights.', 
    category: 'outdoor decorative',
    products: [
      { id: 901, name: 'Cube Sconce Up/Down', img: ['/prod_facade.png', '/prod_pendant.png'], specs: '2x6W / IP65 / Dark Grey' },
      { id: 902, name: 'Slim Wall Wash', img: ['/prod_pendant.png', '/prod_facade.png'], specs: '15W / IP65 / Silver' }
    ]
  },
  { 
    id: 10, 
    images: ['/prod_facade.png', '/prod_pendant.png'], 
    title: 'Kinetic Installations', 
    desc: 'Motorized, moving light elements.', 
    category: 'speciality products',
    products: [
      { id: 1001, name: 'Kinetic Sphere', img: ['/prod_facade.png', '/prod_chandelier.png'], specs: 'RGBW / Winch System / DMX' },
      { id: 1002, name: 'Kinetic Tube', img: ['/prod_chandelier.png', '/prod_facade.png'], specs: 'RGBW / 1m Tube / DMX' }
    ]
  }
];

const categories = ['indoor', 'facade', 'landscape', 'speciality products'];

const ProductsPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialCategory = queryParams.get('category') || categories[0];
  
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [filteredCatalogues, setFilteredCatalogues] = useState([]);
  const [selectedCatalogue, setSelectedCatalogue] = useState(null);
  
  const cataloguesRef = useRef(null);

  useEffect(() => {
    const newCategory = queryParams.get('category');
    if (newCategory && categories.includes(newCategory)) {
      setActiveCategory(newCategory);
      
      // Wait 600ms on top, then scroll down very smoothly
      setTimeout(() => {
        if (cataloguesRef.current) {
          const yOffset = -80; 
          const y = cataloguesRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
          customSmoothScroll(y, 1500); 
        }
      }, 600);
    }
  }, [location.search, location.state?.trigger]);

  useEffect(() => {
    setFilteredCatalogues(
      cataloguesData.filter(cat => cat.category === activeCategory)
    );
  }, [activeCategory]);

  return (
    <div className="products-page">
      <div className="products-hero">
        <div className="products-hero-bg"></div>
        <div className="products-hero-overlay"></div>
        <div className="products-hero-content">
          <h1 className="products-hero-title">OUR PRODUCTS</h1>
          <h3 className="products-hero-subtitle">explore our specialized catalogues</h3>
        </div>
        <div 
          className="hero-scroll-down" 
          onClick={() => {
            const yOffset = -80; 
            const y = cataloguesRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
            customSmoothScroll(y, 1200);
          }}
        ></div>
      </div>

      <div className="catalogues-section" ref={cataloguesRef}>
        <div className="catalogues-header">
          <h2 className="catalogues-category-title">
            <span className="showing-label">showing:</span> {activeCategory}
          </h2>
        </div>

        <div className="zoom-boxes-grid">
          {filteredCatalogues.map((catalogue, index) => (
            <div 
              key={`${activeCategory}-${catalogue.id}`} 
              className="zoom-box"
              onClick={() => setSelectedCatalogue(catalogue)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="zoom-box-img-wrapper">
                <img src={catalogue.images[0]} alt={catalogue.title} className="zoom-box-img" />
              </div>
              <div className="zoom-box-info">
                <h3 className="zoom-box-title">{catalogue.title}</h3>
                <p className="zoom-box-desc">{catalogue.desc}</p>
              </div>
            </div>
          ))}
          {filteredCatalogues.length === 0 && (
            <div className="no-catalogues">
              <p>No catalogues available in this category yet.</p>
            </div>
          )}
        </div>
      </div>

      {selectedCatalogue && (
        <div className="showroom-overlay">
          <style>{`
            .showroom-overlay {
              position: fixed !important;
              top: 0 !important;
              left: 0 !important;
              width: 100vw !important;
              height: 100vh !important;
              background: #080808 !important;
              z-index: 99999 !important;
              overflow-y: auto !important;
              color: #fff !important;
              display: block !important;
            }
            .showroom-container {
              max-width: 1600px;
              margin: 0 auto;
              padding: 100px 4rem;
            }
            .showroom-title {
              font-size: 4rem;
              font-weight: 100;
              letter-spacing: 12px;
              text-transform: uppercase;
              color: #fff !important;
              margin-bottom: 20px;
            }
            .showroom-desc {
              font-size: 1.1rem;
              font-weight: 300;
              color: #888 !important;
              max-width: 700px;
              line-height: 1.8;
              margin-bottom: 80px;
            }
            .showroom-grid {
              display: grid;
              grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
              gap: 60px 40px;
            }
            .showroom-item {
              position: relative;
              transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
              cursor: default;
              opacity: 0;
              transform: translateY(30px);
              animation: showroomItemIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            }
            .showroom-item:hover {
              transform: translateY(-10px);
            }
            .showroom-img-box {
              position: relative;
              width: 100%;
              aspect-ratio: 4 / 5;
              background: #0d0d0d;
              overflow: hidden;
            }
            .showroom-img {
              position: absolute;
              top: 0; left: 0;
              width: 100%;
              height: 100%;
              object-fit: cover;
              opacity: 0;
              transition: all 1.2s cubic-bezier(0.16, 1, 0.3, 1);
            }
            .showroom-img.active {
              opacity: 1;
              position: relative;
            }
            .showroom-item:hover .showroom-img {
              transform: scale(1.1);
            }

            .showroom-item-info {
              position: absolute;
              bottom: 0;
              left: 0;
              width: 100%;
              padding: 40px 30px 30px;
              background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%);
              z-index: 5;
              pointer-events: none;
              opacity: 0.8;
              transition: opacity 0.4s ease;
            }
            .showroom-item:hover .showroom-item-info {
              opacity: 1;
            }
            .showroom-item-name {
              font-size: 1rem;
              font-weight: 300;
              letter-spacing: 4px;
              color: #fff !important;
              margin-bottom: 8px;
              text-transform: uppercase;
            }
            .showroom-item-specs {
              font-size: 0.7rem;
              color: rgba(255,255,255,0.5) !important;
              font-weight: 300;
              letter-spacing: 2px;
              text-transform: uppercase;
            }

            .showroom-nav-arrow {
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
              width: 50px;
              height: 50px;
              display: flex;
              align-items: center;
              justify-content: center;
              z-index: 10;
              cursor: pointer;
              opacity: 0;
              transition: all 0.4s ease;
            }
            .showroom-item:hover .showroom-nav-arrow {
              opacity: 0.5;
            }
            .showroom-nav-arrow:hover { 
              opacity: 1 !important;
              background: rgba(255,255,255,0.05);
            }
            .showroom-nav-arrow.left { left: 10px; }
            .showroom-nav-arrow.right { right: 10px; }
            .showroom-nav-arrow::after {
              content: '';
              width: 12px;
              height: 12px;
              border-top: 1px solid #fff;
              border-right: 1px solid #fff;
            }
            .showroom-nav-arrow.left::after { transform: rotate(-135deg); }
            .showroom-nav-arrow.right::after { transform: rotate(45deg); }
            .showroom-back {
              display: flex;
              align-items: center;
              gap: 15px;
              cursor: pointer;
              color: #888 !important;
              margin-bottom: 60px;
              width: fit-content;
            }
            .showroom-back:hover { color: #fff !important; }
            .back-arrow {
              width: 30px;
              height: 1px;
              background: currentColor;
              position: relative;
            }
            .back-arrow::before {
              content: '';
              position: absolute;
              left: 0; top: 50%;
              width: 8px; height: 8px;
              border-left: 1px solid currentColor;
              border-top: 1px solid currentColor;
              transform: translateY(-50%) rotate(-45deg);
            }
          `}</style>
          <div className="showroom-container">
            <div className="showroom-header">
              <div className="showroom-back" onClick={() => setSelectedCatalogue(null)}>
                <span className="back-arrow"></span>
                <span className="back-text">BACK TO CATALOGUES</span>
              </div>
              <div className="showroom-info">
                <h2 className="showroom-title">{selectedCatalogue.title}</h2>
                <p className="showroom-desc">{selectedCatalogue.desc}</p>
              </div>
            </div>
            
            <div className="showroom-grid">
              {selectedCatalogue.products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ProductCard = ({ product }) => {
  const [currentImg, setCurrentImg] = useState(0);
  const images = Array.isArray(product.img) ? product.img : [product.img];

  const nextImg = (e) => {
    e.stopPropagation();
    setCurrentImg((prev) => (prev + 1) % images.length);
  };

  const prevImg = (e) => {
    e.stopPropagation();
    setCurrentImg((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="showroom-item">
      <div className="showroom-img-box">
        {images.map((img, idx) => (
          <img 
            key={idx}
            src={img} 
            alt={product.name} 
            className={`showroom-img ${idx === currentImg ? 'active' : ''}`} 
          />
        ))}
        
        {images.length > 1 && (
          <>
            <div className="showroom-nav-arrow left" onClick={prevImg}></div>
            <div className="showroom-nav-arrow right" onClick={nextImg}></div>
          </>
        )}
      </div>
      <div className="showroom-item-info">
        <h4 className="showroom-item-name">{product.name}</h4>
        <p className="showroom-item-specs">{product.specs}</p>
      </div>
    </div>
  );
};

export default ProductsPage;
