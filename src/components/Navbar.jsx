import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const productCategories = ['indoor', 'facade', 'landscape', 'speciality products'];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isProjectPage = location.pathname.includes('/project/');
  const useLightText = isProjectPage && !scrolled;

  const isActive = (path, hash = '') => {
    if (hash) {
      return location.pathname === path && location.hash === hash;
    }
    if (path === '/products') {
      return location.pathname.startsWith('/products');
    }
    return location.pathname === path;
  };

  const handleLogoClick = (e) => {
    if (location.pathname === '/' && !location.hash) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`navbar ${scrolled ? 'scrolled' : ''} ${useLightText ? 'navbar-light-theme' : ''}`}
      style={{
        backgroundColor: scrolled ? 'rgba(0, 0, 0, 0.6)' : 'transparent',
        backdropFilter: scrolled ? 'blur(15px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(15px)' : 'none',
      }}
    >
      <div className="navbar-logo">
        {/* State A — independent link, wordmark text */}
        <Link to="/" className="logo-state-text" onClick={handleLogoClick}>
          <div className="logo-text">
            ARCLUMI
          </div>
          <div className="logo-subtext">bespoke architectural lighting</div>
        </Link>

        {/* State B — independent link, PNG monogram */}
        <Link to="/" className="logo-state-icon-link" onClick={handleLogoClick}>
          <img
            src="/logo-Photoroom.png"
            alt="Arclumi"
            className="logo-state-icon"
          />
        </Link>
      </div>

      <ul className="navbar-links">
        <li>
          <Link 
            to="/#projects"
            className={isActive('/', '#projects') ? 'active' : ''}
            onClick={(e) => {
              if (location.pathname === '/') {
                e.preventDefault();
                const element = document.getElementById('projects');
                if (element) {
                  const yOffset = -100;
                  const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                  window.scrollTo({ top: y, behavior: 'smooth' });
                  window.history.pushState(null, '', '/#projects');
                }
              }
            }}
          >
            projects
          </Link>
        </li>
        <li className="dropdown-container">
          <span className={`dropdown-trigger ${isActive('/products') ? 'active' : ''}`}>products</span>
          <div className="dropdown-menu">
            {productCategories.map(cat => (
              <Link
                key={cat}
                to={`/products?category=${encodeURIComponent(cat)}`}
                state={{ trigger: Date.now() }}
                className="dropdown-item"
              >
                {cat}
              </Link>
            ))}
          </div>
        </li>
        <li><Link to="/services" className={isActive('/services') ? 'active' : ''}>services</Link></li>
        <li><Link to="/about" className={isActive('/about') ? 'active' : ''}>about</Link></li>
        <li><Link to="/contact" className={isActive('/contact') ? 'active' : ''}>contact us</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
