import React, { useState } from 'react';
import ContactModal from './ContactModal';
import './Navbar.css';

const Navbar = ({ 
  onRegisterClick, 
  onLoginClick, 
  onLogoutClick, 
  showRegisterDropdown, 
  onRegisterType, 
  isLoggedIn,
  showLoginDropdown,
  onLoginType,
  onHomeClick
}) => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <div className="navbar-brand">
            <h1 onClick={onHomeClick} style={{cursor: 'pointer'}}>Scanova</h1>
          </div>
          
          <div className="navbar-menu">
            <div className="navbar-item">
              <button 
                className="btn btn-secondary navbar-btn home-btn"
                onClick={(e) => {
                  e.preventDefault();
                  onHomeClick();
                  // Smooth scroll to top of page
                  setTimeout(() => {
                    window.scrollTo({ 
                      top: 0, 
                      behavior: 'smooth' 
                    });
                  }, 100);
                }}
              >
                Home
              </button>
            </div>
            
            <div className="navbar-item">
              <button 
                className="btn btn-secondary navbar-btn contact-btn"
                onClick={(e) => {
                  e.preventDefault();
                  setIsContactModalOpen(true);
                }}
              >
                Contact
              </button>
            </div>
            
            <div className="navbar-item">
              <button 
                className="btn btn-secondary navbar-btn"
                onClick={onRegisterClick}
              >
                Register
              </button>
              
              {showRegisterDropdown && (
                <div className="dropdown-menu">
                  <button 
                    className="dropdown-item"
                    onClick={() => onRegisterType('institute')}
                  >
                    Institute Registration
                  </button>
                  <button 
                    className="dropdown-item"
                    onClick={() => onRegisterType('user')}
                  >
                    User/Organization Registration
                  </button>
                </div>
              )}
            </div>
            
            {isLoggedIn ? (
              <button 
                className="btn btn-secondary navbar-btn"
                onClick={onLogoutClick}
              >
                Logout
              </button>
            ) : (
              <div className="navbar-item">
                <button 
                  className="btn btn-secondary navbar-btn"
                  onClick={onLoginClick}
                >
                  Login
                </button>
                
                {showLoginDropdown && (
                  <div className="dropdown-menu">
                    <button 
                      className="dropdown-item"
                      onClick={() => onLoginType('institute')}
                    >
                      Institute Login
                    </button>
                    <button 
                      className="dropdown-item"
                      onClick={() => onLoginType('user')}
                    >
                      User/Organization Login
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </nav>
  );
};

export default Navbar;
