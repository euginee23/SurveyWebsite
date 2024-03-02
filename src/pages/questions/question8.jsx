import React from 'react';
import { FaCheck } from 'react-icons/fa';

const Question8 = ({ formData, handleInputChange }) => {

    if (formData.otherSpecify8 === undefined) {
        formData.otherSpecify8 = '';
    }

    const isAnswered = formData.question8 !== '';
    return (
        <div className="mb-3">
            <label className="form-label"><h6>8. Which device do you primarily use for accessing online media platforms?</h6></label>
            {isAnswered && <FaCheck style={{ color: 'green', marginLeft: '5px' }} />}

            <div className="form-check">
                <input
                    className="form-check-input"
                    type="radio"
                    name="question8"
                    value="Smartphone"
                    checked={formData.question8 === 'Smartphone'}
                    onChange={handleInputChange}
                />
                <label className="form-check-label">Smartphone</label>
            </div>

            <div className="form-check">
                <input
                    className="form-check-input"
                    type="radio"
                    name="question8"
                    value="Laptop"
                    checked={formData.question8 === 'Laptop'}
                    onChange={handleInputChange}
                />
                <label className="form-check-label">Laptop</label>
            </div>

            <div className="form-check">
                <input
                    className="form-check-input"
                    type="radio"
                    name="question8"
                    value="Desktop computer"
                    checked={formData.question8 === 'Desktop computer'}
                    onChange={handleInputChange}
                />
                <label className="form-check-label">Desktop computer</label>
            </div>

            <div className="form-check">
                <input
                    className="form-check-input"
                    type="radio"
                    name="question8"
                    value="Tablet"
                    checked={formData.question8 === 'Tablet'}
                    onChange={handleInputChange}
                />
                <label className="form-check-label">Tablet</label>
            </div>

            <div className="form-check">
                <input
                    className="form-check-input"
                    type="radio"
                    name="question8"
                    value="Other"
                    checked={formData.question8 === 'Other'}
                    onChange={handleInputChange}
                />
                <label className="form-check-label">Others (Please Specify)</label>
            </div>

            {formData.question8 === 'Other' && (
                <div className="mt-2">
                    <label className="form-label">Please Specify:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="otherSpecify8"
                        value={formData.otherSpecify8}
                        onChange={handleInputChange}
                    />
                </div>
            )}
        </div>
    );
};

export default Question8;