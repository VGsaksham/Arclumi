import { useState, useEffect } from 'react';
import './Navbar.css';

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
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-logo">
        <div className="logo-text">
          <span className="logo-light">arc</span>
          <span className="logo-book">lumi</span>
        </div>
        <div className="logo-subtext">experiments with light</div>
      </div>
      <ul className="navbar-links">
        <li><a href="#projects">projects</a></li>
        <li><a href="#services">services</a></li>
        <li><a href="#about">about</a></li>
        <li><a href="#news">news & events</a></li>
        <li><a href="#blogs">blogs</a></li>
        <li><a href="#contact">contact</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
