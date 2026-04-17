import { useState, useEffect } from 'react';
import './Hero.css';

const slides = [
  {
    bg: '/hero_bg_1776455815166.png',
    subtitle: 'RESIDENTIAL',
    title: 'private residence'
  },
  {
    bg: '/project_1_1776455844850.png',
    subtitle: 'COMMERCIAL',
    title: 'corporate space'
  },
  {
    bg: '/project_2_1776455860367.png',
    subtitle: 'HOSPITALITY',
    title: 'luxury hotel'
  }
];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
      setAnimationKey((prevKey) => prevKey + 1);
    }, 10000);

    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    setAnimationKey((prevKey) => prevKey + 1);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    setAnimationKey((prevKey) => prevKey + 1);
  };

  return (
    <section className="hero">
      {slides.map((slide, index) => {
        let containerClass = 'hero-background-container';
        if (index === currentIndex) containerClass += ' active';
        else if (index === (currentIndex - 1 + slides.length) % slides.length) containerClass += ' prev';

        return (
          <div 
            key={index}
            className={containerClass}
          >
            <div 
              className="hero-background" 
              style={{ backgroundImage: `url('${slide.bg}')` }}
            ></div>
          </div>
        );
      })}
      <div className="hero-overlay"></div>
      
      <div key={animationKey} className="hero-content">
        <h3 className="hero-subtitle fade-up">{slides[currentIndex].subtitle}</h3>
        <h1 className="hero-title fade-up">{slides[currentIndex].title}</h1>
        <button className="hero-btn fade-up">EXPLORE</button>
      </div>

      <div className="hero-nav-arrow left" onClick={handlePrev}></div>
      <div className="hero-nav-arrow right" onClick={handleNext}></div>
      <div className="hero-scroll-down"></div>
    </section>
  );
};

export default Hero;
