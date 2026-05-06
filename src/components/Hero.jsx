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
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Reset the auto-slide timer whenever currentIndex changes
    const timer = setInterval(() => {
      if (!isAnimating) {
        handleNext();
      }
    }, 10000);

    return () => clearInterval(timer);
  }, [currentIndex, isAnimating]);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    setAnimationKey((prevKey) => prevKey + 1);
    setTimeout(() => setIsAnimating(false), 1500); // Lock during fade transition
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    setAnimationKey((prevKey) => prevKey + 1);
    setTimeout(() => setIsAnimating(false), 1500); // Lock during fade transition
  };

  // The first load has long delays. Subsequent clicks should animate text faster.
  const isInitialLoad = animationKey === 0;

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
        <h3 className="hero-subtitle fade-up" style={!isInitialLoad ? { animationDelay: '0.3s' } : {}}>{slides[currentIndex].subtitle}</h3>
        <h1 className="hero-title fade-up" style={!isInitialLoad ? { animationDelay: '0.5s' } : {}}>{slides[currentIndex].title}</h1>
        <button className="hero-btn fade-up" style={!isInitialLoad ? { animationDelay: '0.7s' } : {}}>EXPLORE</button>
      </div>

      <div className="hero-nav-arrow left" onClick={handlePrev} style={{ opacity: isAnimating ? 0.5 : 1, cursor: isAnimating ? 'default' : 'pointer' }}></div>
      <div className="hero-nav-arrow right" onClick={handleNext} style={{ opacity: isAnimating ? 0.5 : 1, cursor: isAnimating ? 'default' : 'pointer' }}></div>
      <div className="hero-scroll-down"></div>
    </section>
  );
};

export default Hero;
