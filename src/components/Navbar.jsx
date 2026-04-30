import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const productCategories = ['indoor', 'facade', 'landscape', 'speciality products'];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      style={{
        backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'blur(0px) saturate(100%)',
        WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'blur(0px) saturate(100%)',
        backgroundColor: scrolled ? 'rgba(0, 0, 0, 0.6)' : 'transparent'
      }}
    >
      <div className="navbar-logo">
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="logo-text">
            <span className="logo-light">arc</span>
            <span className="logo-book">lumi</span>
          </div>
          <div className="logo-subtext">experiments with light</div>
        </Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/#projects">projects</Link></li>
        <li className="dropdown-container">
          <span className="dropdown-trigger">products</span>
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
        <li><Link to="/services">services</Link></li>
        <li><Link to="/about">about</Link></li>
        <li><Link to="/contact">contact us</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
