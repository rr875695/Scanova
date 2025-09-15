import React, { useState } from 'react';
import './Registration.css';

const UserRegistration = ({ onBack }) => {
  const [formData, setFormData] = useState({
    organizationName: '',
    companyType: '',
    companyEmail: '',
    contact: '',
    address: '',
    certificationsNumber: '',
    licenseNumber: '',
    password: '',
    confirmPassword: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const companyTypes = [
    'Private Limited',
    'Public Limited',
    'Partnership',
    'Sole Proprietorship',
    'LLP (Limited Liability Partnership)',
    'NGO',
    'Government Organization',
    'Other'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Password validation
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    
    if (formData.password.length < 6) {
      alert('Password must be at least 6 characters long!');
      return;
    }
    
    // Here you would typically send the data to a server
    console.log('User/Organization Registration Data:', formData);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="registration-container">
        <div className="container">
          <div className="card">
            <div className="success-message">
              <h2>Registration Successful!</h2>
              <p>Your organization has been successfully registered. You will receive a confirmation email shortly.</p>
              <button className="btn btn-primary" onClick={onBack}>
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="registration-container">
      <div className="container">
        <div className="card">
          <div className="registration-header">
            <h1>User/Organization Registration</h1>
            <p>Please fill in all the required details for your organization registration.</p>
            <button className="btn btn-secondary" onClick={onBack}>
              ← Back to Home
            </button>
          </div>

          <form onSubmit={handleSubmit} className="registration-form">
            <div className="form-section">
              <h3>Organization Information</h3>
              
              <div className="form-group">
                <label htmlFor="organizationName">Name of Organization/Company *</label>
                <input
                  type="text"
                  id="organizationName"
                  name="organizationName"
                  value={formData.organizationName}
                  onChange={handleChange}
                  required
                  placeholder="Enter organization/company name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="companyType">Company Type *</label>
                <select
                  id="companyType"
                  name="companyType"
                  value={formData.companyType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select company type</option>
                  {companyTypes.map((type, index) => (
                    <option key={index} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="companyEmail">Company Email *</label>
                  <input
                    type="email"
                    id="companyEmail"
                    name="companyEmail"
                    value={formData.companyEmail}
                    onChange={handleChange}
                    required
                    placeholder="Enter company email"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="contact">Contact Number *</label>
                  <input
                    type="tel"
                    id="contact"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    required
                    placeholder="Enter contact number"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="address">Address *</label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  rows="3"
                  placeholder="Enter complete address"
                />
              </div>
            </div>

            <div className="form-section">
              <h3>Certification & License Information</h3>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="certificationsNumber">Certifications Number *</label>
                  <input
                    type="text"
                    id="certificationsNumber"
                    name="certificationsNumber"
                    value={formData.certificationsNumber}
                    onChange={handleChange}
                    required
                    placeholder="Enter certifications number"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="licenseNumber">License Number *</label>
                  <input
                    type="text"
                    id="licenseNumber"
                    name="licenseNumber"
                    value={formData.licenseNumber}
                    onChange={handleChange}
                    required
                    placeholder="Enter license number"
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>Account Security</h3>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="password">Password *</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength="6"
                    placeholder="Enter password (min 6 characters)"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password *</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    minLength="6"
                    placeholder="Confirm your password"
                  />
                </div>
              </div>
            </div>

            <div className="form-actions">
              <button type="button" className="btn btn-secondary" onClick={onBack}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Register Organization
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserRegistration;
