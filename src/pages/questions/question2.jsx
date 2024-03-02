import React from 'react';
import { FaCheck } from 'react-icons/fa';

const Question2 = ({ formData, handleInputChange }) => {
    const isAnswered = formData.question2 !== '';
    return (
        <div className="mb-3">
            <label className="form-label"><h6>2. How many hours per week do you typically spend on social media platforms?</h6></label>
            {isAnswered && <FaCheck style={{ color: 'green', marginLeft: '5px' }} />}

            <div className="form-check">
                <input
                    className="form-check-input"
                    type="radio"
                    name="question2"
                    value="Less than 1 hour"
                    checked={formData.question2 === 'Less than 1 hour'}
                    onChange={handleInputChange}
                />
                <label className="form-check-label">Less than 1 hour</label>
            </div>

            <div className="form-check">
                <input
                    className="form-check-input"
                    type="radio"
                    name="question2"
                    value="1-3 hours"
                    checked={formData.question2 === '1-3 hours'}
                    onChange={handleInputChange}
                />
                <label className="form-check-label">1-3 hours</label>
            </div>

            <div className="form-check">
                <input
                    className="form-check-input"
                    type="radio"
                    name="question2"
                    value="4-6 hours"
                    checked={formData.question2 === '4-6 hours'}
                    onChange={handleInputChange}
                />
                <label className="form-check-label">4-6 hours</label>
            </div>

            <div className="form-check">
                <input
                    className="form-check-input"
                    type="radio"
                    name="question2"
                    value="7-10 hours"
                    checked={formData.question2 === '7-10 hours'}
                    onChange={handleInputChange}
                />
                <label className="form-check-label">7-10 hours</label>
            </div>

            <div className="form-check">
                <input
                    className="form-check-input"
                    type="radio"
                    name="question2"
                    value="More than 10 hours"
                    checked={formData.question2 === 'More than 10 hours'}
                    onChange={handleInputChange}
                />
                <label className="form-check-label">More than 10 hours</label>
            </div>

        </div>
    );
};

export default Question2;