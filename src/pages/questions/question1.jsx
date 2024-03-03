import React from 'react';
import { FaCheck } from 'react-icons/fa';

const Question1 = ({ formData, handleInputChange }) => {
    
    if (formData.otherResponse === undefined) {
        formData.otherResponse = '';
    }

    const isAnswered = formData.question1 !== ''

    return (
        <div className="mb-3">
            <label className="form-label"><h6>1. Which online social media platform do you use most frequently?</h6></label>
            {isAnswered && <FaCheck style={{ color: 'green', marginLeft: '5px' }} />}

            <div className="form-check">
                <input
                    className="form-check-input"
                    type="radio"
                    name="question1"
                    value="Facebook"
                    checked={formData.question1 === 'Facebook'}
                    onChange={handleInputChange}
                />
                <label className="form-check-label">Facebook</label>
            </div>

            <div className="form-check">
                <input
                    className="form-check-input"
                    type="radio"
                    name="question1"
                    value="Instagram"
                    checked={formData.question1 === 'Instagram'}
                    onChange={handleInputChange}
                />
                <label className="form-check-label">Instagram</label>
            </div>

            <div className="form-check">
                <input
                    className="form-check-input"
                    type="radio"
                    name="question1"
                    value="Twitter"
                    checked={formData.question1 === 'Twitter'}
                    onChange={handleInputChange}
                />
                <label className="form-check-label">Twitter</label>
            </div>

            <div className="form-check">
                <input
                    className="form-check-input"
                    type="radio"
                    name="question1"
                    value="LinkedIn"
                    checked={formData.question1 === 'LinkedIn'}
                    onChange={handleInputChange}
                />
                <label className="form-check-label">LinkedIn</label>
            </div>

            <div className="form-check">
                <input
                    className="form-check-input"
                    type="radio"
                    name="question1"
                    value="Reddit"
                    checked={formData.question1 === 'Reddit'}
                    onChange={handleInputChange}
                />
                <label className="form-check-label">Reddit</label>
            </div>

            <div className="form-check">
                <input
                    className="form-check-input"
                    type="radio"
                    name="question1"
                    value="Other"
                    checked={formData.question1 === 'Other'}
                    onChange={handleInputChange}
                />
                <label className="form-check-label">Others</label>
            </div>

            {formData.question1 === 'Other' && (
                <div className="mt-2">
                    <label className="form-label">Please Specify:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="otherResponse"
                        value={formData.otherResponse}
                        onChange={handleInputChange}
                    />
                </div>
            )}
        </div>
    );
};

export default Question1;