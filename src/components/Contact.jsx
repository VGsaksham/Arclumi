import React from 'react';
import './Contact.css';

const Contact = () => {
  return (
    <div className="contact-page">
      <div className="contact-hero">
        <h1 className="contact-main-title">Connect</h1>
        <p className="contact-subtitle">Let's discuss your next project.</p>
      </div>
      <div className="contact-container">
        <div className="contact-info">
          <div className="info-group">
            <h3>Direct</h3>
            <p>Email: sample@email.com<br/>Phone: +1 (000) 000-0000</p>
          </div>
          <div className="info-group">
            <h3>Social</h3>
            <p>Instagram: @sample_insta<br/>LinkedIn: Sample LinkedIn</p>
          </div>
        </div>
        <div className="contact-form-wrapper">
          <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <label>Name</label>
              <input type="text" placeholder="John Doe" />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="john@example.com" />
            </div>
            <div className="form-group">
              <label>Inquiry</label>
              <textarea rows="4" placeholder="Tell us about your project..."></textarea>
            </div>
            <button type="submit" className="submit-btn">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
