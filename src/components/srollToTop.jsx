import React, { useState, useEffect } from 'react';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 500) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div>
      {isVisible && (
        <button
          onClick={scrollToTop}
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            height: '80px',
            width: '80px',
            backgroundColor: 'rgba(0, 0, 255, 0.5)',
            color: 'white',
            borderRadius: '20%',
            border: 'none',
            cursor: 'pointer',
            outline: 'none',
            fontSize: '50px',
          }}
        >
          &uarr;
        </button>
      )}
    </div>
  );
};

export default ScrollToTop;