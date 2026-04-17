import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="footer-container">
        <div className="footer-brand">
          <div className="footer-logo">
            <span className="logo-light">arc</span>
            <span className="logo-book">lumi</span>
          </div>
          <p>Elevating architectural spaces through the medium of light.</p>
        </div>
        
        <div className="footer-links">
          <div className="footer-col">
            <h4>EXPLORE</h4>
            <ul>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#about">About Studio</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>CONNECT</h4>
            <ul>
              <li><a href="#contact">Contact Us</a></li>
              <li><a href="#instagram">Instagram</a></li>
              <li><a href="#linkedin">LinkedIn</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} ARCLUMI. ALL RIGHTS RESERVED.</p>
        <p className="footer-newsletter">SIGN UP FOR NEWSLETTER</p>
      </div>
    </footer>
  );
};

export default Footer;
