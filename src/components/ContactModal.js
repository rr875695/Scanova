import React from 'react';
import './ContactModal.css';

const ContactModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Contact Us</h2>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>
        
        <div className="modal-body">
          <div className="contact-form">
            <h3>Contact Us</h3>
            <p className="form-description">Send us a message and we'll get back to you soon.</p>
            <form>
              <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input 
                  type="text" 
                  id="name"
                  placeholder="Your Name" 
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input 
                  type="email" 
                  id="email"
                  placeholder="Your Email" 
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea 
                  id="message"
                  placeholder="Your Message" 
                  rows="5" 
                  required
                ></textarea>
              </div>
              <button type="submit" className="submit-btn">
                Send Message
              </button>
            </form>
          </div>
        </div>
        
        <div className="modal-footer">
          <div className="social-links">
            <a href="mailto:info@scanova.com" className="social-link">📧</a>
            <a href="tel:+15551234567" className="social-link">📱</a>
            <a href="https://scanova.com" className="social-link">🌐</a>
            <a href="#" className="social-link">💬</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
