// src/components/RemoveBackground.js
import React, { useState } from 'react';
import axios from 'axios';
import './RemoveBackground.css'; // Create this CSS file for styles

const RemoveBackground = ({ image }) => {
  const [bgRemovedImage, setBgRemovedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const removeBackground = async () => {
    const formData = new FormData();
    formData.append('image_file', image);

    setLoading(true);
    setError(null); // Reset error state

    try {
      const response = await axios.post('https://api.remove.bg/v1.0/removebg', formData, {
        headers: {
          'X-Api-Key': 'UYTtEAjoesJ31xbcaLeRYeEi',
        },
        responseType: 'blob',
      });

      const imgUrl = URL.createObjectURL(response.data);
      setBgRemovedImage(imgUrl);
    } catch (error) {
      console.error('Error removing background:', error);
      setError('Failed to remove background. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = () => {
    const link = document.createElement('a');
    link.href = bgRemovedImage;
    link.download = 'background_removed_image.png';
    link.click();
  };

  return (
    <div className="remove-bg-container">
      {image && (
        <div className="image-preview">
          <h3>Original Image</h3>
          <img src={URL.createObjectURL(image)} alt="Original" />
        </div>
      )}
      <button onClick={removeBackground} disabled={loading}>
        {loading ? 'Removing Background...' : 'Remove Background'}
      </button>
      {error && <p className="error-message">{error}</p>}
      {bgRemovedImage && (
        <div className="result-container">
          <h3>Background Removed Image</h3>
          <img src={bgRemovedImage} alt="Background Removed" />
          <div className="download-container"> {/* New container for download button */}
            <button onClick={downloadImage}>Download Image</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RemoveBackground;
