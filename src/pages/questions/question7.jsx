import React from 'react';
import { FaCheck } from 'react-icons/fa';

const Question7 = ({ formData, handleInputChange }) => {
    const isAnswered = formData.question7 !== '';
    return (
        <div className="mb-3">
            <label className="form-label"><h6>7. How frequently do you share or create content on your most used online platform?</h6></label>
            {isAnswered && <FaCheck style={{ color: 'green', marginLeft: '5px' }} />}

            <div className="form-check">
                <input
                    className="form-check-input"
                    type="radio"
                    name="question7"
                    value="Daily"
                    checked={formData.question7 === 'Daily'}
                    onChange={handleInputChange}
                />
                <label className="form-check-label">Daily</label>
            </div>

            <div className="form-check">
                <input
                    className="form-check-input"
                    type="radio"
                    name="question7"
                    value="Weekly"
                    checked={formData.question7 === 'Weekly'}
                    onChange={handleInputChange}
                />
                <label className="form-check-label">Weekly</label>
            </div>

            <div className="form-check">
                <input
                    className="form-check-input"
                    type="radio"
                    name="question7"
                    value="Monthly"
                    checked={formData.question7 === 'Monthly'}
                    onChange={handleInputChange}
                />
                <label className="form-check-label">Monthly</label>
            </div>

            <div className="form-check">
                <input
                    className="form-check-input"
                    type="radio"
                    name="question7"
                    value="Rarely"
                    checked={formData.question7 === 'Rarely'}
                    onChange={handleInputChange}
                />
                <label className="form-check-label">Rarely</label>
            </div>

            <div className="form-check">
                <input
                    className="form-check-input"
                    type="radio"
                    name="question7"
                    value="Never"
                    checked={formData.question7 === 'Never'}
                    onChange={handleInputChange}
                />
                <label className="form-check-label">Never</label>
            </div>

        </div>
    );
};

export default Question7;