import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Footer from './components/Footer';
import ProductsPage from './components/ProductsPage';
import Services from './components/Services';
import About from './components/About';
import Contact from './components/Contact';

import { customSmoothScroll } from './utils';

const ScrollHandler = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          const yOffset = -100; // Offset for navbar
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          customSmoothScroll(y, 1500);
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  return null;
};

const Home = () => (
  <>
    <Hero />
    <Projects />
  </>
);



function App() {
  return (
    <>
      <ScrollHandler />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
