import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SurveyForm from './pages/surveyForm';
import SuccessPage from './pages/successPage';
import ScrollToTop from './components/srollToTop';
import Dashboard from './pages/dashboardPage';
import WelcomePage from './pages/welcomePage';

function App() {
  return (

    <div>
      {/* Top Bar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          {/* Logo and Title */}
          <a className="navbar-brand d-flex align-items-center" href="/">
            <img src="/dist/assets/logo-H-mZ1fqP.png" alt="Logo" width="50" height="50" className="d-inline-block align-top" />
            <h2 className="ms-2 mb-0">Survey Website</h2>
          </a>
        </div>
      </nav>

      {/* Main content */}
      <Router>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/survey-form" element={<SurveyForm />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router >
      
      {/* ScrollToTop component */}
      <ScrollToTop />

    </div>

  );
}

export default App;
