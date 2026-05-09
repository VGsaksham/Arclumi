import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import './Navbar.css';

const productCategories = ['indoor', 'facade', 'landscape', 'speciality products'];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
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

  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileDropdownOpen(false);
  }, [location]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setMobileDropdownOpen(false);
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

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

      <div className="mobile-menu-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
        {mobileMenuOpen ? <FiX size={24} color={useLightText && !scrolled ? '#111' : '#fff'} /> : <FiMenu size={24} color={useLightText && !scrolled ? '#111' : '#fff'} />}
      </div>

      <ul className={`navbar-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
        <li style={{ animationDelay: '0.1s' }}>
          <Link 
            to="/#projects"
            className={isActive('/', '#projects') ? 'active' : ''}
            onClick={(e) => {
              setMobileMenuOpen(false);
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
        <li className="dropdown-container" style={{ animationDelay: '0.2s' }}>
          <span 
            className={`dropdown-trigger ${isActive('/products') ? 'active' : ''}`}
            onClick={() => {
              if (window.innerWidth <= 768) {
                setMobileDropdownOpen(!mobileDropdownOpen);
              }
            }}
          >
            products
          </span>
          <div className={`dropdown-menu ${mobileDropdownOpen ? 'mobile-dropdown-open' : ''}`}>
            {productCategories.map(cat => (
              <Link
                key={cat}
                to={`/products?category=${encodeURIComponent(cat)}`}
                state={{ trigger: Date.now() }}
                className="dropdown-item"
                onClick={() => setMobileMenuOpen(false)}
              >
                {cat}
              </Link>
            ))}
          </div>
        </li>
        <li style={{ animationDelay: '0.3s' }}><Link to="/services" className={isActive('/services') ? 'active' : ''} onClick={() => setMobileMenuOpen(false)}>services</Link></li>
        <li style={{ animationDelay: '0.4s' }}><Link to="/about" className={isActive('/about') ? 'active' : ''} onClick={() => setMobileMenuOpen(false)}>about</Link></li>
        <li style={{ animationDelay: '0.5s' }}><Link to="/contact" className={isActive('/contact') ? 'active' : ''} onClick={() => setMobileMenuOpen(false)}>contact us</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
