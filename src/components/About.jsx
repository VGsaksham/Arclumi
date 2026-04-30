import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <div className="about-hero">
        <h1 className="about-main-title">About Us</h1>
        <p className="about-subtitle">Pioneering architectural light.</p>
      </div>
      <div className="about-content">
        <div className="about-text-block">
          <h2>Our Philosophy</h2>
          <p>
            At Arclumi, we believe light is more than illumination—it is a structural element that defines space, mood, and perception. Our approach marries rigorous engineering with poetic design, creating luminous environments that inspire.
          </p>
        </div>
        <div className="about-image-block">
          <img src="/prod_facade.png" alt="Arclumi Philosophy" className="about-image" />
        </div>
        <div className="about-text-block right">
          <h2>Our Process</h2>
          <p>
            From conceptualization to meticulous commissioning, we work closely with architects and designers. Every luminaire, every angle, and every control system is bespoke, ensuring the final visual experience is unparalleled.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
