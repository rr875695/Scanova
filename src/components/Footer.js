import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Scanova</h3>
            <p>Your comprehensive platform for institute and organization registration. Secure, reliable, and easy to use.</p>
            <div className="social-links">
              <a href="mailto:info@scanova.com" className="social-link">📧</a>
              <a href="tel:+15551234567" className="social-link">📱</a>
              <a href="https://scanova.com" className="social-link">🌐</a>
            </div>
          </div>
          
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Registration</h4>
            <ul className="footer-links">
              <li><a href="#institute">Institute Registration</a></li>
              <li><a href="#organization">Organization Registration</a></li>
              <li><a href="#login">Login</a></li>
              <li><a href="#help">Help Center</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Contact Info</h4>
            <div className="contact-info">
              <p>📧 info@scanova.com</p>
              <p>📞 +1 (555) 123-4567</p>
              <p>📍 123 Tech Street, Digital City, DC 12345</p>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>&copy; 2024 Scanova. All rights reserved.</p>
            <div className="footer-bottom-links">
              <a href="#privacy">Privacy Policy</a>
              <a href="#terms">Terms of Service</a>
              <a href="#cookies">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
