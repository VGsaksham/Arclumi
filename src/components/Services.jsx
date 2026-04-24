import React, { useEffect, useRef } from 'react';
import './Services.css';

const services = [
  {
    id: '01',
    title: 'Architectural Lighting Design',
    desc: 'Conceptualizing and calculating light as a structural element to enhance form and function.',
    img: '/prod_linear.png'
  },
  {
    id: '02',
    title: 'Custom Engineering',
    desc: 'Bespoke luminaire design and technical development for unique architectural requirements.',
    img: '/prod_chandelier.png'
  },
  {
    id: '03',
    title: 'Integrated Control Systems',
    desc: 'Intelligent automation and scene programming to create dynamic environmental atmospheres.',
    img: '/prod_facade.png'
  },
  {
    id: '04',
    title: 'Commissioning & Supervision',
    desc: 'On-site technical oversight ensuring every detail aligns with the original vision.',
    img: '/prod_pendant.png'
  }
];

const Services = () => {
  const scrollRefs = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      scrollRefs.current.forEach((ref) => {
        if (!ref) return;
        const rect = ref.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        // Calculate how much of the element is in the viewport
        // Progress from 0 (bottom of screen) to 1 (top of screen)
        const progress = 1 - (rect.top / viewportHeight);
        
        if (progress > 0 && progress < 1.5) {
          const scale = 1 + (progress * 0.15); // Scale from 1 to 1.15
          const img = ref.querySelector('.service-image');
          if (img) {
            img.style.transform = `scale(${scale})`;
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="services-page">
      <div className="services-hero">
        <h1 className="services-main-title">Expertise</h1>
        <p className="services-subtitle">Precision and poetry in light.</p>
      </div>

      <div className="services-container">
        {services.map((service, index) => (
          <div 
            key={service.id} 
            className={`service-block ${index % 2 === 0 ? 'even' : 'odd'}`}
            ref={el => scrollRefs.current[index] = el}
          >
            <div className="service-number">{service.id}</div>
            <div className="service-content">
              <h2 className="service-title">{service.title}</h2>
              <p className="service-description">{service.desc}</p>
            </div>
            <div className="service-image-wrapper">
              <img src={service.img} alt={service.title} className="service-image" />
              <div className="service-image-overlay"></div>
            </div>
          </div>
        ))}
      </div>

      <div className="services-footer">
        <h3 className="footer-callout">Let's illuminate your next project.</h3>
        <a href="/contacts" className="contact-link">Inquiry</a>
      </div>
    </div>
  );
};

export default Services;
