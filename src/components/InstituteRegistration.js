import React, { useState } from 'react';
import './Registration.css';

const InstituteRegistration = ({ onBack }) => {
  const [formData, setFormData] = useState({
    instituteName: '',
    affiliationNumber: '',
    instituteEmail: '',
    contactNumber: '',
    address: '',
    principalName: '',
    principalContact: '',
    principalEmail: '',
    totalCourses: '',
    totalDegrees: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to a server
    console.log('Institute Registration Data:', formData);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="registration-container">
        <div className="container">
          <div className="card">
            <div className="success-message">
              <h2>Registration Successful!</h2>
              <p>Your institute has been successfully registered. You will receive a confirmation email shortly.</p>
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
            <h1>Institute Registration</h1>
            <p>Please fill in all the required details for your institute registration.</p>
            <button className="btn btn-secondary" onClick={onBack}>
              ← Back to Home
            </button>
          </div>

          <form onSubmit={handleSubmit} className="registration-form">
            <div className="form-section">
              <h3>Institute Information</h3>
              
              <div className="form-group">
                <label htmlFor="instituteName">Institute Name *</label>
                <input
                  type="text"
                  id="instituteName"
                  name="instituteName"
                  value={formData.instituteName}
                  onChange={handleChange}
                  required
                  placeholder="Enter institute name"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="affiliationNumber">Affiliation Number *</label>
                  <input
                    type="text"
                    id="affiliationNumber"
                    name="affiliationNumber"
                    value={formData.affiliationNumber}
                    onChange={handleChange}
                    required
                    placeholder="Enter affiliation number"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="instituteEmail">Institute Email Address *</label>
                  <input
                    type="email"
                    id="instituteEmail"
                    name="instituteEmail"
                    value={formData.instituteEmail}
                    onChange={handleChange}
                    required
                    placeholder="Enter institute email"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="contactNumber">Contact Number *</label>
                <input
                  type="tel"
                  id="contactNumber"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  required
                  placeholder="Enter contact number"
                />
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
              <h3>Principal Details</h3>
              
              <div className="form-group">
                <label htmlFor="principalName">Principal Name *</label>
                <input
                  type="text"
                  id="principalName"
                  name="principalName"
                  value={formData.principalName}
                  onChange={handleChange}
                  required
                  placeholder="Enter principal name"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="principalContact">Principal Contact Number *</label>
                  <input
                    type="tel"
                    id="principalContact"
                    name="principalContact"
                    value={formData.principalContact}
                    onChange={handleChange}
                    required
                    placeholder="Enter principal contact"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="principalEmail">Principal Email *</label>
                  <input
                    type="email"
                    id="principalEmail"
                    name="principalEmail"
                    value={formData.principalEmail}
                    onChange={handleChange}
                    required
                    placeholder="Enter principal email"
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>Academic Information</h3>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="totalCourses">Total Courses Available *</label>
                  <input
                    type="number"
                    id="totalCourses"
                    name="totalCourses"
                    value={formData.totalCourses}
                    onChange={handleChange}
                    required
                    min="1"
                    placeholder="Enter number of courses"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="totalDegrees">Total Degrees Available *</label>
                  <input
                    type="number"
                    id="totalDegrees"
                    name="totalDegrees"
                    value={formData.totalDegrees}
                    onChange={handleChange}
                    required
                    min="1"
                    placeholder="Enter number of degrees"
                  />
                </div>
              </div>
            </div>

            <div className="form-actions">
              <button type="button" className="btn btn-secondary" onClick={onBack}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Register Institute
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InstituteRegistration;
