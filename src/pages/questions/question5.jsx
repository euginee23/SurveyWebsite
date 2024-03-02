import React from 'react';
import { FaCheck } from 'react-icons/fa';

const Question5 = ({ formData, handleInputChange }) => {
    const isAnswered = formData.question5 !== '';
    return (
        <div className="mb-3">
            <label className="form-label"><h6>5. What type of content do you engage with the most on your preferred online platform?</h6></label>
            {isAnswered && <FaCheck style={{ color: 'green', marginLeft: '5px' }} />}

            <div className="form-check">
                <input
                    className="form-check-input"
                    type="radio"
                    name="question5"
                    value="Text-based posts"
                    checked={formData.question5 === 'Text-based posts'}
                    onChange={handleInputChange}
                />
                <label className="form-check-label">Text-based posts</label>
            </div>

            <div className="form-check">
                <input
                    className="form-check-input"
                    type="radio"
                    name="question5"
                    value="Images and photos"
                    checked={formData.question5 === 'Images and photos'}
                    onChange={handleInputChange}
                />
                <label className="form-check-label">Images and photos</label>
            </div>

            <div className="form-check">
                <input
                    className="form-check-input"
                    type="radio"
                    name="question5"
                    value="Videos and Reels"
                    checked={formData.question5 === 'Videos and Reels'}
                    onChange={handleInputChange}
                />
                <label className="form-check-label">Videos and Reels</label>
            </div>

            <div className="form-check">
                <input
                    className="form-check-input"
                    type="radio"
                    name="question5"
                    value="Memes and humor"
                    checked={formData.question5 === 'Memes and humor'}
                    onChange={handleInputChange}
                />
                <label className="form-check-label">Memes and humor</label>
            </div>

            <div className="form-check">
                <input
                    className="form-check-input"
                    type="radio"
                    name="question5"
                    value="News and articles"
                    checked={formData.question5 === 'News and articles'}
                    onChange={handleInputChange}
                />
                <label className="form-check-label">News and articles</label>
            </div>

        </div>
    );
};

export default Question5;