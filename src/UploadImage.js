// src/components/UploadImage.js
import React, { useState } from 'react';

const UploadImage = ({ onUpload }) => {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      onUpload(file);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      {image && <img src={image} alt="Uploaded" style={{ maxWidth: '300px' }} />}
    </div>
  );
};

export default UploadImage;
