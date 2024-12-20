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
    <div style={{ position: 'relative', maxWidth: '500px', margin: '0 auto' }}>
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
        }}
      >
        <p style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'white' }}>
          {testimonialsData[currentIndex].name}
        </p>
        <p style={{ color: 'black', marginTop: '10px' }}>
          {testimonialsData[currentIndex].testimonial}
        </p>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={handlePrev}
        style={{
          position: 'absolute',
          top: '50%',
          left: '-50px',
          transform: 'translateY(-50%)',
          background: 'white',
          border: '2px solid #6366f1',
          borderRadius: '50%',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          cursor: 'pointer',
          width: '40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        &lt;
      </button>
      <button
        onClick={handleNext}
        style={{
          position: 'absolute',
          top: '50%',
          right: '-50px',
          transform: 'translateY(-50%)',
          background: 'white',
          border: '2px solid #6366f1',
          borderRadius: '50%',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          cursor: 'pointer',
          width: '40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        &gt;
      </button>
    </div>
  );
};

export default Testimonials;
