import React from 'react';
import './Navbar.css';

const Navbar = ({ 
  onRegisterClick, 
  onLoginClick, 
  onLogoutClick, 
  showRegisterDropdown, 
  onRegisterType, 
  isLoggedIn,
  showLoginDropdown,
  onLoginClick: onLoginClickProp,
  onLoginType
}) => {
  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <div className="navbar-brand">
            <h1>Scanova</h1>
          </div>
          
          <div className="navbar-menu">
            <div className="navbar-item">
              <button 
                className="btn btn-primary navbar-btn"
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
    </nav>
  );
};

export default Navbar;
