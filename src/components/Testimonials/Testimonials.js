import React, { useState } from 'react';
import testimonialsData from '../../helpers/testimonialsData';
import 'bootstrap/dist/css/bootstrap.min.css';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonialsData.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonialsData.length - 1 : prevIndex - 1
    );
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '500px', // Max width for large screens
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          minHeight: '200px',
          backgroundColor: '#6366f1',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
          width: '100%',
          marginBottom: '20px', // Space for the buttons
        }}
      >
        <img
          src={testimonialsData[currentIndex].image}
          alt={testimonialsData[currentIndex].name}
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            marginBottom: '20px',
            objectFit: 'cover',
            border: '4px solid black',
          }}
        />
        <p style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'white' }}>
          {testimonialsData[currentIndex].name}
        </p>
        <p style={{ color: 'black', marginTop: '10px' }}>
          {testimonialsData[currentIndex].testimonial}
        </p>
      </div>

      {/* Buttons positioned below the card */}
      <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
        <button
          onClick={handlePrev}
          style={{
            background: 'white',
            border: '2px solid #6366f1',
            borderRadius: '50%',
            padding: '10px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '35px',
            height: '35px',
          }}
        >
          &lt;
        </button>
        <button
          onClick={handleNext}
          style={{
            background: 'white',
            border: '2px solid #6366f1',
            borderRadius: '50%',
            padding: '10px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '35px',
            height: '35px',
          }}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Testimonials;
