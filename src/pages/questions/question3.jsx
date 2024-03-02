import React from 'react';
import { FaCheck } from 'react-icons/fa';

const Question3 = ({ formData, handleInputChange }) => {

    if (formData.otherSpecify3 === undefined) {
        formData.otherSpecify3 = '';
    }
    
    const isAnswered = formData.question3 !== '';
    return (
        <div className="mb-3">
            <label className="form-label"><h6>3. Which streaming service do you use the most for entertainment?</h6></label>
            {isAnswered && <FaCheck style={{ color: 'green', marginLeft: '5px' }} />}

            <div className="form-check">
                <input
                    className="form-check-input"
                    type="radio"
                    name="question3"
                    value="Netflix"
                    checked={formData.question3 === 'Netflix'}
                    onChange={handleInputChange}
                />
                <label className="form-check-label">Netflix</label>
            </div>

            <div className="form-check">
                <input
                    className="form-check-input"
                    type="radio"
                    name="question3"
                    value="YouTube"
                    checked={formData.question3 === 'YouTube'}
                    onChange={handleInputChange}
                />
                <label className="form-check-label">YouTube</label>
            </div>

            <div className="form-check">
                <input
                    className="form-check-input"
                    type="radio"
                    name="question3"
                    value="Twitch"
                    checked={formData.question3 === 'Twitch'}
                    onChange={handleInputChange}
                />
                <label className="form-check-label">Twitch</label>
            </div>

            <div className="form-check">
                <input
                    className="form-check-input"
                    type="radio"
                    name="question3"
                    value="Amazon Prime Video"
                    checked={formData.question3 === 'Amazon Prime Video'}
                    onChange={handleInputChange}
                />
                <label className="form-check-label">Amazon Prime Video</label>
            </div>

            <div className="form-check">
                <input
                    className="form-check-input"
                    type="radio"
                    name="question3"
                    value="Disney+"
                    checked={formData.question3 === 'Disney+'}
                    onChange={handleInputChange}
                />
                <label className="form-check-label">Disney+</label>
            </div>

            <div className="form-check">
                <input
                    className="form-check-input"
                    type="radio"
                    name="question3"
                    value="Other"
                    checked={formData.question3 === 'Other'}
                    onChange={handleInputChange}
                />
                <label className="form-check-label">Others (Please Specify)</label>
            </div>

            {formData.question3 === 'Other' && (
                <div className="mt-2">
                    <label className="form-label">Please Specify:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="otherSpecify3"
                        value={formData.otherSpecify3}
                        onChange={handleInputChange}
                    />
                </div>
            )}
        </div>
    );
};

export default Question3;