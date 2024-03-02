import React, { useEffect } from 'react';

const ScrollToError = ({ firstErrorRef }) => {
  useEffect(() => {

    if (firstErrorRef.current) {
      firstErrorRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [firstErrorRef]);

  return null;
};

export default ScrollToError;
