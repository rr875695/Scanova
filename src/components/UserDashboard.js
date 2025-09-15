import React, { useState } from 'react';
import './UserDashboard.css';

const UserDashboard = ({ organizationName, onLogout }) => {
  const [currentView, setCurrentView] = useState('main');
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [previewFile, setPreviewFile] = useState(null);

  const userStatusData = {
    alreadyVerified: 45,
    findTempered: 3,
    userProfile: organizationName,
    totalCertificates: 48
  };

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
      status: 'pending'
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
      
      setUploadedFiles(prev => 
        prev.map(f => 
          f.id === file.id 
            ? { ...f, status: 'uploading' }
            : f
        )
      );
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      
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

  const scanFile = (file) => {
    console.log('Scanning file:', file.name);
    // Simulate scanning process
    setUploadedFiles(prev => 
      prev.map(f => 
        f.id === file.id 
          ? { ...f, status: 'scanning' }
          : f
      )
    );
    
    setTimeout(() => {
      setUploadedFiles(prev => 
        prev.map(f => 
          f.id === file.id 
            ? { ...f, status: 'scanned' }
            : f
        )
      );
    }, 3000);
  };

  const startVerify = (file) => {
    console.log('Starting verification for:', file.name);
    // Simulate verification process
    setUploadedFiles(prev => 
      prev.map(f => 
        f.id === file.id 
          ? { ...f, status: 'verifying' }
          : f
      )
    );
    
    setTimeout(() => {
      setUploadedFiles(prev => 
        prev.map(f => 
          f.id === file.id 
            ? { ...f, status: 'verified' }
            : f
        )
      );
    }, 2000);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const renderMainView = () => (
    <div className="user-dashboard-main">
      <div className="welcome-section">
        <h1>Hi {organizationName}!</h1>
        <p>Welcome to your Organization Dashboard</p>
      </div>

      <div className="upload-section">
        <h2>Upload Certificate for Verification</h2>
        <div className="upload-area">
          <div 
            className={`upload-box ${dragActive ? 'drag-active' : ''}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => document.getElementById('file-input-user').click()}
          >
            <div className="upload-icon">📁</div>
            <p>Drag & drop certificates here or click to browse</p>
            <input
              id="file-input-user"
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
                        {file.status === 'scanning' && '🔍 Scanning...'}
                        {file.status === 'scanned' && '🔍 Scanned'}
                        {file.status === 'verifying' && '🔐 Verifying...'}
                        {file.status === 'verified' && '✅ Verified'}
                        {file.status === 'error' && '❌ Error'}
                      </span>
                    </div>
                  </div>
                  <div className="file-actions">
                    <button 
                      className="action-btn preview-btn"
                      onClick={() => previewFileContent(file)}
                    >
                      Preview
                    </button>
                    <button 
                      className="action-btn delete-btn"
                      onClick={() => confirmDelete(file.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons for Uploaded Files */}
        {uploadedFiles.length > 0 && (
          <div className="action-buttons-section">
            <h3>🎯 File Actions</h3>
            <div className="action-buttons-grid">
              <button 
                className="action-btn upload-btn"
                onClick={uploadAllFiles}
                disabled={uploadedFiles.every(f => f.status !== 'pending')}
              >
                📤 Upload All
              </button>
              <button 
                className="action-btn scan-btn"
                onClick={() => {
                  const filesToScan = uploadedFiles.filter(f => f.status === 'uploaded');
                  filesToScan.forEach(file => scanFile(file));
                }}
                disabled={!uploadedFiles.some(f => f.status === 'uploaded')}
              >
                🔍 Scan All
              </button>
              <button 
                className="action-btn verify-btn"
                onClick={() => {
                  const scannedFiles = uploadedFiles.filter(f => f.status === 'scanned');
                  scannedFiles.forEach(file => startVerify(file));
                }}
                disabled={!uploadedFiles.some(f => f.status === 'scanned')}
              >
                ✅ Start Verify
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="user-status-section">
        <h2>User Status</h2>
        <div className="status-grid">
          <div className="status-card" onClick={() => setCurrentView('verified')}>
            <div className="status-icon">✅</div>
            <div className="status-info">
              <h3>{userStatusData.alreadyVerified}</h3>
              <p>Already Verified</p>
            </div>
          </div>
          
          <div className="status-card" onClick={() => setCurrentView('tempered')}>
            <div className="status-icon">⚠️</div>
            <div className="status-info">
              <h3>{userStatusData.findTempered}</h3>
              <p>Find Tempered</p>
            </div>
          </div>
          
          <div className="status-card" onClick={() => setCurrentView('profile')}>
            <div className="status-icon">👤</div>
            <div className="status-info">
              <h3>Profile</h3>
              <p>User Profile</p>
            </div>
          </div>
          
          <div className="status-card" onClick={() => setCurrentView('main')}>
            <div className="status-icon">🏠</div>
            <div className="status-info">
              <h3>Back</h3>
              <p>Back to Dashboard</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderVerifiedView = () => (
    <div className="verified-view">
      <h2>Already Verified Certificates</h2>
      <div className="verified-list">
        <div className="verified-item">
          <span className="cert-name">Certificate 1</span>
          <span className="cert-status verified">✅ Verified</span>
        </div>
        <div className="verified-item">
          <span className="cert-name">Certificate 2</span>
          <span className="cert-status verified">✅ Verified</span>
        </div>
      </div>
      <button className="back-btn" onClick={() => setCurrentView('main')}>
        Back to Dashboard
      </button>
    </div>
  );

  const renderTemperedView = () => (
    <div className="tempered-view">
      <h2>Find Tempered Certificates</h2>
      <div className="tempered-list">
        <div className="tempered-item">
          <span className="cert-name">Certificate 3</span>
          <span className="cert-status tempered">⚠️ Tempered</span>
        </div>
      </div>
      <button className="back-btn" onClick={() => setCurrentView('main')}>
        Back to Dashboard
      </button>
    </div>
  );

  const renderProfileView = () => (
    <div className="profile-view">
      <h2>User Profile</h2>
      <div className="profile-info">
        <p><strong>Organization:</strong> {organizationName}</p>
        <p><strong>Total Certificates:</strong> {userStatusData.totalCertificates}</p>
        <p><strong>Verified:</strong> {userStatusData.alreadyVerified}</p>
        <p><strong>Tempered:</strong> {userStatusData.findTempered}</p>
      </div>
      <button className="back-btn" onClick={() => setCurrentView('main')}>
        Back to Dashboard
      </button>
    </div>
  );

  const renderContent = () => {
    switch (currentView) {
      case 'verified':
        return renderVerifiedView();
      case 'tempered':
        return renderTemperedView();
      case 'profile':
        return renderProfileView();
      default:
        return renderMainView();
    }
  };

  return (
    <div className="user-dashboard">
      <div className="dashboard-header">
        <h1>Organization Management System</h1>
        <div className="user-info">
          <span>Hi, {organizationName}!</span>
          <button className="logout-btn" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>
      
      <div className="dashboard-body">
        {renderContent()}
      </div>

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

export default UserDashboard;