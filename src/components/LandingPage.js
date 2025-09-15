import React from 'react';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="container">
        <div className="landing-content">
          <div className="hero-section">
            <div className="hero-text">
              <h1>Welcome to Scanova</h1>
              <p className="hero-subtitle">
                Your comprehensive platform for institute and organization registration
              </p>
              <p className="hero-description">
                Join thousands of institutes and organizations who trust Scanova for their 
                registration and management needs. Get started today with our simple and 
                secure registration process.
              </p>
            </div>
            <div className="hero-image">
              <img 
                src="/lock.png" 
                alt="Secure Registration" 
                className="lock-image"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              <div className="image-placeholder" style={{display: 'none'}}>
                <div className="placeholder-content">
                  <div className="lock-icon">🔒</div>
                  <p>Secure Registration</p>
                  <small>Place lock.png in the public folder</small>
                </div>
              </div>
            </div>
          </div>
          
          <div className="features-section">
            <h2>Why Choose Scanova?</h2>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">🏛️</div>
                <h3>Institute Registration</h3>
                <p>Complete registration process for educational institutes with all necessary details and verification.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🏢</div>
                <h3>Organization Registration</h3>
                <p>Register your company or organization with proper documentation and certification management.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🔐</div>
                <h3>Secure & Reliable</h3>
                <p>Your data is protected with industry-standard security measures and encryption.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
