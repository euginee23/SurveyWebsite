import React from 'react';
import SurveyForm from './pages/surveyForm';

function App() {
  return (
    <div>
      {/* Top Bar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          {/* Logo and Title */}
          <a className="navbar-brand d-flex align-items-center" href="#">
            <img src="logo.png" alt="Logo" width="50" height="50" className="d-inline-block align-top" />
            <h2 className="ms-2 mb-0">Survey Website</h2>
          </a>
        </div>
      </nav>

      {/* Survey Form */}
      <div className="container mt-4">
        <SurveyForm />
      </div>
      
    </div>
  );
}

export default App;