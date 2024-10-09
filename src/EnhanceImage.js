// src/components/EnhanceImage.js
import React, { useState } from 'react';
import axios from 'axios';

const EnhanceImage = ({ image }) => {
  const [enhancedImage, setEnhancedImage] = useState(null);

  const enhanceImage = async () => {
    const formData = new FormData();
    formData.append('image_file', image);

    try {
      const response = await axios.post('https://api.enhance-image.com/v1.0/enhance', formData, {
        headers: {
          'X-Api-Key': 'qJOiSBD7jaQDYNWkh6YIANuVFt7K6FdN',
        },
        responseType: 'blob',
      });

      const imgUrl = URL.createObjectURL(response.data);
      setEnhancedImage(imgUrl);
    } catch (error) {
      console.error('Error enhancing image:', error);
    }
  };

  return (
    <div>
      <button onClick={enhanceImage}>Enhance Image</button>
      {enhancedImage && <img src={enhancedImage} alt="Enhanced Image" />}
    </div>
  );
};

export default EnhanceImage;
