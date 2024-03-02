import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SurveyForm from './pages/surveyForm';
import SuccessPage from './pages/successPage';
import ScrollToTop from './components/srollToTop';

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

      {/* Main content */}
      <Router>
        <Routes>
          <Route path="/" element={<SurveyForm />} />
          <Route path="/success" element={<SuccessPage />} />
        </Routes>
      </Router >
      
      {/* ScrollToTop component */}
      <ScrollToTop />

    </div>

  );
}

export default App;
