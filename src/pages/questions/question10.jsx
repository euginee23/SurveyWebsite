import React from 'react';
import { FaCheck } from 'react-icons/fa';

const Question10 = ({ formData, handleInputChange }) => {

    const isAnswered = formData.question10 !== '';

    return (
        <div className="mb-3">
            <label className="form-label"><h6>10. Do you actively seek out and follow content creators or influencers on your preferred online platform?</h6></label>
            {isAnswered && <FaCheck style={{ color: 'green', marginLeft: '5px' }} />}

            <div className="form-check">
                <input
                    className="form-check-input"
                    type="radio"
                    name="question10"
                    value="Frequently"
                    checked={formData.question10 === 'Frequently'}
                    onChange={handleInputChange}
                />
                <label className="form-check-label">Yes, frequently</label>
            </div>

            <div className="form-check">
                <input
                    className="form-check-input"
                    type="radio"
                    name="question10"
                    value="Occasionally"
                    checked={formData.question10 === 'Occasionally'}
                    onChange={handleInputChange}
                />
                <label className="form-check-label">Yes, occasionally</label>
            </div>

            <div className="form-check">
                <input
                    className="form-check-input"
                    type="radio"
                    name="question10"
                    value="No"
                    checked={formData.question10 === 'No'}
                    onChange={handleInputChange}
                />
                <label className="form-check-label">No, I do not follow content creators or influencers</label>
            </div>
        </div>
    );
};

export default Question10;
