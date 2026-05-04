import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    file: null
  });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'message') setError('');
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, file: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Word count validation (approx 2 lines worth)
    const wordCount = formData.message.trim().split(/\s+/).filter(w => w.length > 0).length;
    if (wordCount < 20) {
      setError('Please provide a more detailed inquiry (minimum 20 words) to help us understand your project.');
      return;
    }

    console.log('Form Submitted:', formData);
    alert('Thank you for your inquiry. We will get back to you shortly.');
  };

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
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input 
                type="text" 
                name="name"
                placeholder="John Doe" 
                required 
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input 
                type="email" 
                name="email"
                placeholder="john@example.com" 
                required 
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input 
                type="tel" 
                name="phone"
                placeholder="+1 234 567 890" 
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Inquiry</label>
              <textarea 
                name="message"
                rows="6" 
                placeholder="Tell us about your project in detail..." 
                required
                onChange={handleInputChange}
              ></textarea>
              {error && <p className="form-error">{error}</p>}
              <p className="form-hint">At least 20 words (~2 lines) recommended.</p>
            </div>
            <div className="form-group file-group">
              <label>Project Files (Optional)</label>
              <div className="file-input-wrapper">
                <input 
                  type="file" 
                  id="project-file" 
                  onChange={handleFileChange}
                />
                <span className="file-custom-btn">
                  {formData.file ? formData.file.name : 'Choose File or Drag & Drop'}
                </span>
              </div>
            </div>
            <button type="submit" className="submit-btn">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
