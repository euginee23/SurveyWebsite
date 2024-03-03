import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const WelcomePage = () => {
    const [loading, setLoading] = useState(false);

    const handleSurveyClick = () => {
        setLoading(true);
    };

    const handleDashboardClick = () => {
        setLoading(true);
    };

    return (
        <div className="container mt-4 mb-4">
            <div className="container mt-4 mb-4" style={{ boxShadow: '0 5px 20px rgba(1, 1, 1, 0.16)', borderRadius: '8px', overflow: 'hidden', marginTop: '8px', marginBottom: '20px', maxWidth: '800px' }}>
                <div className="header bg-primary" style={{ backgroundColor: 'gray', color: 'white', padding: '10px', borderRadius: '8px 8px 0 0', marginLeft: '-12px', marginRight: '-12px', marginBottom: '20px' }}>
                    <h5 style={{ marginLeft: '15px', marginTop: '10px' }}>Welcome!</h5>
                </div>


                <div className="container mt-4 mb-4" style={{ boxShadow: '0 5px 20px rgba(1, 1, 1, 0.16)', borderRadius: '8px', overflow: 'hidden', marginTop: '8px', marginBottom: '20px', maxWidth: '800px', fontSize: '25px' }}>
                    <div className="container mt-4" style={{ fontSize: '20px', textAlign: 'justify' }}>
                        <p style={{ textIndent: '30px' }}>Hello Crimson and Instructors! We hope you had a great day. Greetings from the BSCS Department! We invite you to participate in our survey, aiming to <span style={{ fontWeight: 'bold' }}>Identify the Most-Used Online Platform Digital Media at Western Mindanao State University Pagadian</span>.</p>
                        <p style={{ textIndent: '30px' }}>Your insights are invaluable to us as we strive to understand preferences and trends in the utilization of digital media on campus, significantly contributing to enhancing the overall digital experience for our university community.</p>
                        <p style={{ marginTop: '70px' }}>This survey should take approximately 5 minutes or less of your valuable time to complete.</p>
                        <p>To begin the survey, click on <span style={{ fontWeight: 'bold' }}>"Continue to Survey"</span> button.</p>
                    </div>
                </div>
                <div className="d-flex justify-content-between">
                    <Link to="/survey-form" className="btn btn-success btn-lg mb-4 mt-1" disabled={loading} onClick={handleSurveyClick}>
                    {loading ? 'Loading...' : 'Continue to Survey'}
                    </Link>

                    <Link to="/dashboard" className="btn btn-primary btn-lg mb-4 mt-1" disabled={loading} onClick={handleDashboardClick}>
                    {loading ? 'Loading...' : 'Go to Dashboard'}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default WelcomePage;
