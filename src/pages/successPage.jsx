import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SuccessPage = () => {
  const navigate = useNavigate();

  const handleSubmitAnother = () => {
    navigate('/'); 
  };

  return (
    <div className="container mt-4 mb-4">
      <div className="container mt-4 mb-4" style={{ boxShadow: '0 5px 20px rgba(1, 1, 1, 0.16)', borderRadius: '8px', overflow: 'hidden', marginTop: '8px', marginBottom: '20px', maxWidth: '800px' }}>
        <div className="header bg-primary" style={{ backgroundColor: 'gray', color: 'white', padding: '10px', borderRadius: '8px 8px 0 0', marginLeft: '-12px', marginRight: '-12px', marginBottom: '20px' }}>
          <h5 style={{ marginLeft: '15px', marginTop: '10px' }}>Form Submitted Successfully</h5>
        </div>

        <div className="container mt-4">
          <h2 style={{ margin: '25px'}}>Thank you for submitting! We appreciate your time.</h2>

          <div className="d-flex justify-content-end">
          <Link to="/" className="btn btn-success btn-lg mb-4 mt-1" style={{ margin: '10px'}} onClick={handleSubmitAnother}>
            Submit Another
          </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
