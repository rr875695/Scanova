import React, { useState } from 'react';
import './Login.css';

const Login = ({ onLoginSuccess, onBack, loginType, onRegisterClick }) => {
  const [formData, setFormData] = useState({
    loginType: loginType || '',
    email: '',
    password: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  // Update loginType when prop changes
  React.useEffect(() => {
    if (loginType) {
      setFormData(prev => ({
        ...prev,
        loginType: loginType
      }));
    }
  }, [loginType]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate API call
    try {
      // Here you would typically make an API call to authenticate
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
      
      // For demo purposes, accept any email/password combination
      if (formData.email && formData.password && formData.loginType) {
        console.log('Login successful:', formData);
        onLoginSuccess();
      } else {
        setError('Please select login type and enter both email and password');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="container">
        <div className="login-card">
          <div className="login-header">
            <h1>Login to Scanova</h1>
            <p>Enter your credentials to access your account</p>
            <button className="btn btn-secondary back-btn" onClick={onBack}>
              ← Back to Home
            </button>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="loginType">Login Type *</label>
              <input
                type="text"
                id="loginType"
                name="loginType"
                value={formData.loginType}
                readOnly
                className="readonly-input"
                placeholder="Login type selected from navbar"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email address"
                disabled={isLoading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password *</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
                disabled={isLoading}
              />
            </div>

            <div className="form-actions">
              <button 
                type="submit" 
                className="btn btn-primary login-btn"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="spinner"></span>
                    Logging in...
                  </>
                ) : (
                  'Login'
                )}
              </button>
            </div>

            <div className="login-footer">
              <p>
                Don't have an account? 
                <span className="register-link" onClick={onRegisterClick}> Register here</span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
