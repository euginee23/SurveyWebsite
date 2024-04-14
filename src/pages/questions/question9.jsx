import React from 'react';
import { FaCheck } from 'react-icons/fa';

const Question9 = ({ formData, handleInputChange }) => {

    const isAnswered = formData.question9 !== '';

    return (
        <div className="mb-3">
            <label className="form-label"><h6>9. How do you perceive the impact of social media on your mental health?</h6></label>
            {isAnswered && <FaCheck style={{ color: 'green', marginLeft: '5px' }} />}

            <div className="form-check">
                <input
                    className="form-check-input"
                    type="radio"
                    name="question9"
                    value="Very positive"
                    checked={formData.question9 === 'Very positive'}
                    onChange={handleInputChange}
                />
                <label className="form-check-label">Very positive</label>
            </div>

            <div className="form-check">
                <input
                    className="form-check-input"
                    type="radio"
                    name="question9"
                    value="Somewhat positive"
                    checked={formData.question9 === 'Somewhat positive'}
                    onChange={handleInputChange}
                />
                <label className="form-check-label">Somewhat positive</label>
            </div>

            <div className="form-check">
                <input
                    className="form-check-input"
                    type="radio"
                    name="question9"
                    value="Neutral"
                    checked={formData.question9 === 'Neutral'}
                    onChange={handleInputChange}
                />
                <label className="form-check-label">Neutral</label>
            </div>

            <div className="form-check">
                <input
                    className="form-check-input"
                    type="radio"
                    name="question9"
                    value="Somewhat negative"
                    checked={formData.question9 === 'Somewhat negative'}
                    onChange={handleInputChange}
                />
                <label className="form-check-label">Somewhat negative</label>
            </div>

            <div className="form-check">
                <input
                    className="form-check-input"
                    type="radio"
                    name="question9"
                    value="Very negative"
                    checked={formData.question9 === 'Very negative'}
                    onChange={handleInputChange}
                />
                <label className="form-check-label">Very negative</label>
            </div>
        </div>
    );
};

export default Question9;
