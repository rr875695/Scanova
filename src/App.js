import React, { useState } from 'react';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import InstituteRegistration from './components/InstituteRegistration';
import UserRegistration from './components/UserRegistration';
import Login from './components/Login';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [showRegisterDropdown, setShowRegisterDropdown] = useState(false);
  const [showLoginDropdown, setShowLoginDropdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginType, setLoginType] = useState('');

  const handleRegisterClick = () => {
    setShowRegisterDropdown(!showRegisterDropdown);
  };

  const handleRegisterType = (type) => {
    setCurrentPage(type);
    setShowRegisterDropdown(false);
  };

  const handleLogin = () => {
    setShowLoginDropdown(!showLoginDropdown);
  };

  const handleLoginType = (type) => {
    setLoginType(type);
    setCurrentPage('login');
    setShowLoginDropdown(false);
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setCurrentPage('landing');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('landing');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'institute':
        return <InstituteRegistration onBack={() => setCurrentPage('landing')} />;
      case 'user':
        return <UserRegistration onBack={() => setCurrentPage('landing')} />;
      case 'login':
        return <Login onLoginSuccess={handleLoginSuccess} onBack={() => setCurrentPage('landing')} loginType={loginType} onRegisterClick={handleRegisterClick} />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="App">
      <Navbar 
        onRegisterClick={handleRegisterClick}
        onLoginClick={handleLogin}
        onLogoutClick={handleLogout}
        showRegisterDropdown={showRegisterDropdown}
        onRegisterType={handleRegisterType}
        isLoggedIn={isLoggedIn}
        showLoginDropdown={showLoginDropdown}
        onLoginType={handleLoginType}
      />
      {renderPage()}
    </div>
  );
}

export default App;
