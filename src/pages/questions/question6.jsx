import React from 'react';
import { FaCheck } from 'react-icons/fa';

const Question6 = ({ formData, handleInputChange }) => {

    if (formData.otherSpecify6 === undefined) {
        formData.otherSpecify6 = '';
    }

    const isAnswered = formData.question6 !== '';
    return (
        <div className="mb-3">
            <label className="form-label"><h6>6. What influences your choice of online media platform?</h6></label>
            {isAnswered && <FaCheck style={{ color: 'green', marginLeft: '5px' }} />}

            <div className="form-check">
                <input
                    className="form-check-input"
                    type="radio"
                    name="question6"
                    value="Content shared by friends"
                    checked={formData.question6 === 'Content shared by friends'}
                    onChange={handleInputChange}
                />
                <label className="form-check-label">Content shared by friends</label>
            </div>

            <div className="form-check">
                <input
                    className="form-check-input"
                    type="radio"
                    name="question6"
                    value="News and information"
                    checked={formData.question6 === 'News and information'}
                    onChange={handleInputChange}
                />
                <label className="form-check-label">News and information</label>
            </div>

            <div className="form-check">
                <input
                    className="form-check-input"
                    type="radio"
                    name="question6"
                    value="Entertainment content"
                    checked={formData.question6 === 'Entertainment content'}
                    onChange={handleInputChange}
                />
                <label className="form-check-label">Entertainment content</label>
            </div>

            <div className="form-check">
                <input
                    className="form-check-input"
                    type="radio"
                    name="question6"
                    value="User interface and experience"
                    checked={formData.question6 === 'User interface and experience'}
                    onChange={handleInputChange}
                />
                <label className="form-check-label">User interface and experience</label>
            </div>

            <div className="form-check">
                <input
                    className="form-check-input"
                    type="radio"
                    name="question6"
                    value="Other"
                    checked={formData.question6 === 'Other'}
                    onChange={handleInputChange}
                />
                <label className="form-check-label">Others (Please Specify)</label>
            </div>

            {formData.question6 === 'Other' && (
                <div className="mt-2">
                    <label className="form-label">Please Specify:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="otherSpecify6"
                        value={formData.otherSpecify6}
                        onChange={handleInputChange}
                    />
                </div>
            )}
        </div>
    );
};

export default Question6;