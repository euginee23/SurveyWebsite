import React from 'react';
import { FaCheck } from 'react-icons/fa';

const Question4 = ({ formData, handleInputChange }) => {

    if (formData.otherSpecify4 === undefined) {
        formData.otherSpecify4 = '';
    }

    const isAnswered = formData.question4 && formData.communicationApp!== '';
    return (
        <div className="mb-3">
            <label className="form-label"><h6>4. How do you primarily communicate with your peers online?</h6></label>
            {isAnswered && <FaCheck style={{ color: 'green', marginLeft: '5px' }} />}

            {/*OPTION 1*/}
            <div className="form-check">
                <input
                    className="form-check-input"
                    type="radio"
                    name="question4"
                    value="Messaging apps selection"
                    checked={formData.question4 === 'Messaging apps selection'}
                    onChange={handleInputChange}
                />
                <label className="form-check-label">Messaging apps (e.g., WhatsApp, Messenger)</label>
            </div>

            {formData.question4 === 'Messaging apps selection' && (
                <div style={{ marginLeft: '2rem' }} className="ml-10 mt-2">
                    <label className="form-label">Select specific app:</label>

                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="communicationApp"
                            value="Facebook Messenger"
                            checked={formData.communicationApp === 'Facebook Messenger'}
                            onChange={handleInputChange}
                        />
                        <label className="form-check-label">Facebook Messenger</label>
                    </div>

                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="communicationApp"
                            value="WhatsApp"
                            checked={formData.communicationApp === 'WhatsApp'}
                            onChange={handleInputChange}
                        />
                        <label className="form-check-label">WhatsApp</label>
                    </div>

                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="communicationApp"
                            value="Telegram"
                            checked={formData.communicationApp === 'Telegram'}
                            onChange={handleInputChange}
                        />
                        <label className="form-check-label">Telegram</label>
                    </div>

                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="communicationApp"
                            value="Viber"
                            checked={formData.communicationApp === 'Viber'}
                            onChange={handleInputChange}
                        />
                        <label className="form-check-label">Viber</label>
                    </div>

                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="communicationApp"
                            value="Skype"
                            checked={formData.communicationApp === 'Skype'}
                            onChange={handleInputChange}
                        />
                        <label className="form-check-label">Skype</label>
                    </div>

                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="communicationApp"
                            value="Discord"
                            checked={formData.communicationApp === 'Discord'}
                            onChange={handleInputChange}
                        />
                        <label className="form-check-label">Discord</label>
                    </div>

                </div>
            )}

            {/*OPTION 2*/}
            <div className="form-check">
                <input
                    className="form-check-input"
                    type="radio"
                    name="question4"
                    value="Video calls selection"
                    checked={formData.question4 === 'Video calls selection'}
                    onChange={handleInputChange}
                />
                <label className="form-check-label">Video calls (e.g., Zoom, Skype)</label>
            </div>

            {formData.question4 === 'Video calls selection' && (
                <div style={{ marginLeft: '2rem' }} className="ml-10 mt-2">
                    <label className="form-label">Select specific app:</label>

                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="communicationApp"
                            value="Zoom"
                            checked={formData.communicationApp === 'Zoom'}
                            onChange={handleInputChange}
                        />
                        <label className="form-check-label">Zoom</label>
                    </div>

                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="communicationApp"
                            value="Skype"
                            checked={formData.communicationApp === 'Skype'}
                            onChange={handleInputChange}
                        />
                        <label className="form-check-label">Skype</label>
                    </div>

                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="communicationApp"
                            value="FaceTime"
                            checked={formData.communicationApp === 'FaceTime'}
                            onChange={handleInputChange}
                        />
                        <label className="form-check-label">FaceTime</label>
                    </div>

                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="communicationApp"
                            value="Facebook Messenger"
                            checked={formData.communicationApp === 'Facebook Messenger'}
                            onChange={handleInputChange}
                        />
                        <label className="form-check-label">Facebook Messenger</label>
                    </div>
                </div>
            )}

            {/*OPTION 3*/}
            <div className="form-check">
                <input
                    className="form-check-input"
                    type="radio"
                    name="question4"
                    value="Email selection"
                    checked={formData.question4 === 'Email selection'}
                    onChange={handleInputChange}
                />
                <label className="form-check-label">Email</label>
            </div>

            {formData.question4 === 'Email selection' && (
                <div style={{ marginLeft: '2rem' }} className="ml-10 mt-2">
                    <label className="form-label">Select specific app:</label>

                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="communicationApp"
                            value="Gmail"
                            checked={formData.communicationApp === 'Gmail'}
                            onChange={handleInputChange}
                        />
                        <label className="form-check-label">Gmail</label>
                    </div>

                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="communicationApp"
                            value="Yahoo!"
                            checked={formData.communicationApp === 'Yahoo!'}
                            onChange={handleInputChange}
                        />
                        <label className="form-check-label">Yahoo!</label>
                    </div>

                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="communicationApp"
                            value="Outlook"
                            checked={formData.communicationApp === 'Outlook'}
                            onChange={handleInputChange}
                        />
                        <label className="form-check-label">Outlook</label>
                    </div>

                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="communicationApp"
                            value="iCloud Mail"
                            checked={formData.communicationApp === 'iCloud Mail'}
                            onChange={handleInputChange}
                        />
                        <label className="form-check-label">iCloud Mail</label>
                    </div>

                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="communicationApp"
                            value="ProtonMail"
                            checked={formData.communicationApp === 'ProtonMail'}
                            onChange={handleInputChange}
                        />
                        <label className="form-check-label">ProtonMail</label>
                    </div>

                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="communicationApp"
                            value="Zoho Mail"
                            checked={formData.communicationApp === 'Zoho Mail'}
                            onChange={handleInputChange}
                        />
                        <label className="form-check-label">Zoho Mail</label>
                    </div>

                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="communicationApp"
                            value="Mail.com"
                            checked={formData.communicationApp === 'Mail.com'}
                            onChange={handleInputChange}
                        />
                        <label className="form-check-label">Mail.com</label>
                    </div>

                </div>
            )}

            {/*OPTION 4*/}
            <div className="form-check">
                <input
                    className="form-check-input"
                    type="radio"
                    name="question4"
                    value="Other"
                    checked={formData.question4 === 'Other'}
                    onChange={handleInputChange}
                />
                <label className="form-check-label">Others (Please Specify)</label>
            </div>

            {formData.question4 === 'Other' && (
                <div className="mt-2">
                    <label className="form-label">Please Specify:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="otherSpecify4"
                        value={formData.otherSpecify4}
                        onChange={handleInputChange}
                    />
                </div>
            )}
        </div>
    );
};

export default Question4;