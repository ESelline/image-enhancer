// src/App.js
import React, { useState } from 'react';
import RemoveBackground from './RemoveBackground';
import './App.css'; // Optional: Add your global styles here

const App = () => {
  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  return (
    <div className="app-container">
      <h1>Image Background Remover</h1>
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleImageChange} 
        style={{ margin: '20px 0' }} 
      />
      {image && <RemoveBackground image={image} />}
    </div>
  );
};

export default App;
