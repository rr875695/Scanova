import React, { useState } from 'react';
import './InstituteDashboard.css';

const InstituteDashboard = ({ instituteName, onLogout }) => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [previewFile, setPreviewFile] = useState(null);

  const dashboardData = {
    totalUploaded: 156,
    totalVerified: 142,
    reuploaded: 8,
    totalForgery: 3
  };

  const renderDashboard = () => (
    <div className="dashboard-content">
      <div className="welcome-section">
        <h1>Hello {instituteName}!</h1>
        <p>Welcome to your Institute Dashboard</p>
      </div>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📄</div>
          <div className="stat-info">
            <h3>{dashboardData.totalUploaded}</h3>
            <p>Total Certificate Uploaded</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-info">
            <h3>{dashboardData.totalVerified}</h3>
            <p>Total Certificate Verified</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">🔄</div>
          <div className="stat-info">
            <h3>{dashboardData.reuploaded}</h3>
            <p>Reuploaded Certificate</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">⚠️</div>
          <div className="stat-info">
            <h3>{dashboardData.totalForgery}</h3>
            <p>Total Forgery Certificate</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderUpload = () => {

    const handleDrag = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.type === "dragenter" || e.type === "dragover") {
        setDragActive(true);
      } else if (e.type === "dragleave") {
        setDragActive(false);
      }
    };

    const handleDrop = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFiles(e.dataTransfer.files);
      }
    };

    const handleFiles = (files) => {
      console.log('Files received:', files);
      const fileArray = Array.from(files);
      const newFiles = fileArray.map(file => ({
        id: Date.now() + Math.random(),
        name: file.name,
        size: file.size,
        type: file.type,
        file: file,
        status: 'pending' // Add status tracking
      }));
      console.log('New files to add:', newFiles);
      setUploadedFiles(prev => [...prev, ...newFiles]);
    };

    const handleFileInput = (e) => {
      console.log('File input changed:', e.target.files);
      if (e.target.files && e.target.files[0]) {
        handleFiles(e.target.files);
      }
    };

    const removeFile = (id) => {
      setUploadedFiles(prev => prev.filter(file => file.id !== id));
      setShowDeleteConfirm(null);
    };

    const confirmDelete = (id) => {
      setShowDeleteConfirm(id);
    };

    const cancelDelete = () => {
      setShowDeleteConfirm(null);
    };

    const previewFileContent = (file) => {
      setPreviewFile(file);
    };

    const closePreview = () => {
      setPreviewFile(null);
    };

    const uploadFile = async (file) => {
      try {
        console.log('Uploading file:', file.name);
        
        // Create FormData for file upload
        const formData = new FormData();
        formData.append('file', file.file);
        formData.append('instituteName', instituteName);
        formData.append('uploadType', 'certificate');
        
        // Simulate upload process
        setUploadedFiles(prev => 
          prev.map(f => 
            f.id === file.id 
              ? { ...f, status: 'uploading' }
              : f
          )
        );
        
        // Simulate API call (replace with actual upload endpoint)
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Update status to uploaded
        setUploadedFiles(prev => 
          prev.map(f => 
            f.id === file.id 
              ? { ...f, status: 'uploaded' }
              : f
          )
        );
        
        console.log('File uploaded successfully:', file.name);
        
      } catch (error) {
        console.error('Upload failed:', error);
        setUploadedFiles(prev => 
          prev.map(f => 
            f.id === file.id 
              ? { ...f, status: 'error' }
              : f
          )
        );
      }
    };

    const uploadAllFiles = async () => {
      const pendingFiles = uploadedFiles.filter(file => file.status === 'pending');
      
      for (const file of pendingFiles) {
        await uploadFile(file);
      }
    };

    const formatFileSize = (bytes) => {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB', 'GB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
      <div className="section-content">
        <h2>Upload Section</h2>
        
        <div className="upload-area">
          <div 
            className={`upload-box ${dragActive ? 'drag-active' : ''}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => document.getElementById('file-input-institute').click()}
          >
            <div className="upload-icon">📁</div>
            <p>Drag & drop certificates here or click to browse</p>
            <button 
              type="button" 
              className="btn btn-primary"
              onClick={(e) => {
                e.stopPropagation();
                console.log('Choose Files button clicked');
                document.getElementById('file-input-institute').click();
              }}
            >
              Choose Files
            </button>
            <input
              id="file-input-institute"
              type="file"
              multiple
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              onChange={handleFileInput}
              style={{ display: 'none' }}
            />
          </div>
        </div>

        {uploadedFiles.length > 0 && (
          <div className="uploaded-files">
            <h3>Uploaded Files ({uploadedFiles.length})</h3>
            <div className="file-list">
              {uploadedFiles.map((file) => (
                <div key={file.id} className="file-item">
                  <div className="file-info">
                    <span className="file-icon">
                      {file.type.startsWith('image/') ? '🖼️' : 
                       file.type.includes('pdf') ? '📄' : 
                       file.type.includes('word') ? '📝' : '📄'}
                    </span>
                    <div className="file-details">
                      <span className="file-name">{file.name}</span>
                      <span className="file-size">{formatFileSize(file.size)}</span>
                      <span className={`file-status status-${file.status}`}>
                        {file.status === 'pending' && '⏳ Pending'}
                        {file.status === 'uploading' && '📤 Uploading...'}
                        {file.status === 'uploaded' && '✅ Uploaded'}
                        {file.status === 'error' && '❌ Error'}
                      </span>
                    </div>
                  </div>
                  <div className="file-actions">
                    {file.status === 'uploaded' && (
                      <button 
                        className="preview-btn"
                        onClick={() => previewFileContent(file)}
                        title="Preview File"
                      >
                        👁️ Preview
                      </button>
                    )}
                    {file.status === 'pending' && (
                      <button 
                        className="upload-single-btn"
                        onClick={() => uploadFile(file)}
                      >
                        Upload
                      </button>
                    )}
                    <button 
                      className="delete-btn"
                      onClick={() => confirmDelete(file.id)}
                      title="Delete File"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="upload-actions">
              <button 
                className="btn btn-primary"
                onClick={uploadAllFiles}
                disabled={uploadedFiles.filter(f => f.status === 'pending').length === 0}
              >
                Upload All Files ({uploadedFiles.filter(f => f.status === 'pending').length})
              </button>
              <button 
                className="btn btn-secondary"
                onClick={() => setUploadedFiles([])}
              >
                Clear All
              </button>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>Confirm Delete</h3>
              <p>Are you sure you want to delete this file? This action cannot be undone.</p>
              <div className="modal-actions">
                <button 
                  className="btn btn-secondary"
                  onClick={cancelDelete}
                >
                  Cancel
                </button>
                <button 
                  className="btn btn-danger"
                  onClick={() => removeFile(showDeleteConfirm)}
                >
                  Delete File
                </button>
              </div>
            </div>
          </div>
        )}

        {/* File Preview Modal */}
        {previewFile && (
          <div className="modal-overlay">
            <div className="preview-modal">
              <div className="preview-header">
                <h3>File Preview: {previewFile.name}</h3>
                <button 
                  className="close-preview-btn"
                  onClick={closePreview}
                >
                  ✕
                </button>
              </div>
              <div className="preview-content">
                {previewFile.type.startsWith('image/') ? (
                  <img 
                    src={URL.createObjectURL(previewFile.file)} 
                    alt={previewFile.name}
                    className="preview-image"
                  />
                ) : previewFile.type.includes('pdf') ? (
                  <div className="pdf-preview">
                    <iframe 
                      src={URL.createObjectURL(previewFile.file)}
                      className="preview-iframe"
                      title={previewFile.name}
                    />
                  </div>
                ) : (
                  <div className="file-info-preview">
                    <div className="file-icon-large">
                      {previewFile.type.includes('word') ? '📝' : '📄'}
                    </div>
                    <h4>{previewFile.name}</h4>
                    <p><strong>Size:</strong> {formatFileSize(previewFile.size)}</p>
                    <p><strong>Type:</strong> {previewFile.type}</p>
                    <p><strong>Status:</strong> 
                      <span className={`file-status status-${previewFile.status}`}>
                        {previewFile.status === 'uploaded' && '✅ Uploaded'}
                      </span>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderHistory = () => (
    <div className="section-content">
      <h2>History Section</h2>
      <div className="history-list">
        <div className="history-item">
          <span className="date">2024-01-15</span>
          <span className="action">Certificate uploaded</span>
          <span className="status verified">Verified</span>
        </div>
        <div className="history-item">
          <span className="date">2024-01-14</span>
          <span className="action">Certificate uploaded</span>
          <span className="status pending">Pending</span>
        </div>
        <div className="history-item">
          <span className="date">2024-01-13</span>
          <span className="action">Certificate reuploaded</span>
          <span className="status verified">Verified</span>
        </div>
      </div>
    </div>
  );

  const renderAbout = () => (
    <div className="section-content">
      <h2>About Section</h2>
      <div className="about-info">
        <h3>Institute Information</h3>
        <p><strong>Name:</strong> {instituteName}</p>
        <p><strong>Registration Date:</strong> January 1, 2024</p>
        <p><strong>Total Certificates:</strong> {dashboardData.totalUploaded}</p>
        <p><strong>Verification Rate:</strong> {Math.round((dashboardData.totalVerified / dashboardData.totalUploaded) * 100)}%</p>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'upload':
        return renderUpload();
      case 'history':
        return renderHistory();
      case 'about':
        return renderAbout();
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="institute-dashboard">
      <div className="dashboard-sidebar">
        <div className="sidebar-header">
          <h2>Institute Dashboard</h2>
        </div>
        
        <nav className="sidebar-nav">
          <button 
            className={`nav-item ${activeSection === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveSection('dashboard')}
          >
            <span className="nav-icon">🏠</span>
            Dashboard
          </button>
          
          <button 
            className={`nav-item ${activeSection === 'upload' ? 'active' : ''}`}
            onClick={() => setActiveSection('upload')}
          >
            <span className="nav-icon">📤</span>
            Upload Section
          </button>
          
          <button 
            className={`nav-item ${activeSection === 'history' ? 'active' : ''}`}
            onClick={() => setActiveSection('history')}
          >
            <span className="nav-icon">📋</span>
            History Section
          </button>
          
          <button 
            className={`nav-item ${activeSection === 'about' ? 'active' : ''}`}
            onClick={() => setActiveSection('about')}
          >
            <span className="nav-icon">ℹ️</span>
            About Section
          </button>
        </nav>
        
        <div className="sidebar-footer">
          <button className="logout-btn" onClick={onLogout}>
            <span className="nav-icon">🚪</span>
            Logout
          </button>
        </div>
      </div>
      
      <div className="dashboard-main">
        <div className="dashboard-header">
          <h1>Institute Management System</h1>
          <div className="user-info">
            <span>Welcome, {instituteName}</span>
          </div>
        </div>
        
        <div className="dashboard-body">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default InstituteDashboard;
