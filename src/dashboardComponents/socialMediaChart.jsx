import React, { useState, useEffect } from 'react';
import { Bar } from "react-chartjs-2";
import apiUrl from '../../apiUrl';

const MediaPlatformChart = () => {
    const [mediaPlatformData, setMediaPlatformData] = useState([]);
    const [minAge, setMinAge] = useState('');
    const [maxAge, setMaxAge] = useState('');
    const [gender, setGender] = useState('');
    const [position, setPosition] = useState('');
    const [course, setCourse] = useState('');
    const [showCourseDropdown, setShowCourseDropdown] = useState(false);

    const [hoursSpent, setHoursSpent] = useState('');
    const [contentEngaged, setContentEngaged] = useState('');
    const [influences, setInfluences] = useState('');
    const [contentCreationFrequency, setContentCreationFrequency] = useState('');
    const [deviceUsed, setDeviceUsed] = useState('');
    const [mentalHealthImpact, setMentalHealthImpact] = useState('');
    const [followingCreators, setFollowingCreators] = useState('');

    useEffect(() => {
        const fetchMediaPlatformData = async () => {
            try {
                const mediaPlatformResponse = await fetch(`${apiUrl}/api/getMediaPlatformChartData`);
                const mediaPlatformData = await mediaPlatformResponse.json();
                setMediaPlatformData(mediaPlatformData);
            } catch (error) {
                console.error('Error fetching media platform data:', error.message);
            }
        };

        fetchMediaPlatformData();
    }, []);

    const backgroundColors = [
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 99, 132, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(255, 159, 64, 0.6)',
        'rgba(128, 0, 128, 0.6)',
        'rgba(0, 128, 0, 0.6)',
        'rgba(255, 0, 0, 0.6)',
        'rgba(0, 0, 128, 0.6)',
        'rgba(255, 165, 0, 0.6)',
        'rgba(0, 255, 0, 0.6)',
        'rgba(0, 255, 255, 0.6)',
        'rgba(128, 128, 128, 0.6)',
    ];

    const clearFilters = () => {
        setMinAge('');
        setMaxAge('');
        setGender('');
        setPosition('');
        setCourse('');
        setHoursSpent('');
        setContentEngaged('');
        setInfluences('');
        setContentCreationFrequency('');
        setDeviceUsed('');
        setMentalHealthImpact('');
        setFollowingCreators('');
    };

    const handlePositionChange = (e) => {
        setPosition(e.target.value);
        if (e.target.value === 'student') {
            setShowCourseDropdown(true);
        } else {
            setShowCourseDropdown(false);
        }
    };

    const handleFilterClick = async () => {
        console.log("Selected Filters:", { minAge, maxAge, gender, position, course, hoursSpent, contentEngaged, influences, contentCreationFrequency, deviceUsed, mentalHealthImpact, followingCreators });

        try {
            const filterParams = new URLSearchParams({
                minAge,
                maxAge,
                gender,
                position,
                course,
                hoursSpent,
                contentEngaged,
                influences,
                contentCreationFrequency,
                deviceUsed,
                mentalHealthImpact,
                followingCreators,
            }).toString();

            const mediaPlatformResponse = await fetch(`${apiUrl}/api/getMediaPlatformChartData?${filterParams}`);
            const filteredMediaPlatformData = await mediaPlatformResponse.json();

            setMediaPlatformData(filteredMediaPlatformData);
        } catch (error) {
            console.error('Error fetching filtered media platform data:', error.message);
        }
    };


    return (
        <div className="col-md-12 mb-4">
            <div className="card mt-4">
                <div className="card-body">
                    <h5 className="card-title mb-4">Filter by Respondent Specifications:</h5>
                    <div className="row">
                        <div className="col-md-3 mb-3">
                            <div className="form-group">

                                <label htmlFor="minAge">Filter age range:</label>
                                <div className="d-flex">
                                    <input
                                        type="number"
                                        id="minAge"
                                        className="form-control mr-2"
                                        placeholder="Min Age"
                                        value={minAge}
                                        onChange={(e) => setMinAge(e.target.value)}
                                    />
                                    <span><h6> _ </h6></span>
                                    <input
                                        type="number"
                                        id="maxAge"
                                        className="form-control ml-2"
                                        placeholder="Max Age"
                                        value={maxAge}
                                        onChange={(e) => setMaxAge(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 mb-3">
                            <div className="form-group">
                                <label htmlFor="gender">Filter by Gender:</label>
                                <select
                                    id="gender"
                                    className="form-control"
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                >
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-3 mb-3">
                            <div className="form-group">
                                <label htmlFor="position">Filter by Position:</label>
                                <select
                                    id="position"
                                    className="form-control"
                                    value={position}
                                    onChange={handlePositionChange}
                                >
                                    <option value="">Select Position</option>
                                    <option value="student">Student</option>
                                    <option value="instructor">Instructor</option>
                                </select>
                            </div>
                        </div>
                        {showCourseDropdown && (
                            <div className="col-md-3">
                                <div className="form-group">
                                    <label htmlFor="course">Filter Course:</label>
                                    <select
                                        id="course"
                                        className="form-control"
                                        value={course}
                                        onChange={(e) => setCourse(e.target.value)}
                                    >
                                        <option value="">Select Course</option>
                                        <option value="BSCS">BSCS (Bachelor of Science in Computer Science)</option>
                                        <option value="ACT">ACT (Associate in Computer Technology)</option>
                                        <option value="ABPS">ABPS (Bachelor of Arts in Political Science)</option>
                                        <option value="BS_CRIM">BS CRIM (Bachelor of Science in Criminology)</option>
                                        <option value="BSSW">BSSW (Bachelor of Science in Social Work)</option>
                                        <option value="BEED">BEED (Bachelor of Elementary Education)</option>
                                        <option value="BSED_English">BSED English (Bachelor of Secondary Education Major in English)</option>
                                        <option value="BSED_Science">BSED Science (Bachelor of Secondary Education Major in Science)</option>
                                    </select>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="card mt-4">
                <div className="card-body">
                    <h5 className="card-title mb-4">Filter by Platform Engagement:</h5>
                    <div className="row">
                        <div className="col-md-3 mb-3">
                            <div className="form-group">
                                <label htmlFor="hoursSpent">Filter by Hours Spent:</label>
                                <select
                                    id="hoursSpent"
                                    className="form-control"
                                    value={hoursSpent}
                                    onChange={(e) => setHoursSpent(e.target.value)}
                                >
                                    <option value="">Select Hours Spent</option>
                                    <option value="Less than 1 hour">Less than 1 hour</option>
                                    <option value="1-3 hours">1-3 hours</option>
                                    <option value="4-6 hours">4-6 hours</option>
                                    <option value="7-10 hours">7-10 hours</option>
                                    <option value="More than 10 hours">More than 10 hours</option>
                                </select>
                            </div>
                        </div>

                        <div className="col-md-3 mb-3">
                            <div className="form-group">
                                <label htmlFor="contentEngaged">Filter by Content Engaged:</label>
                                <select
                                    id="contentEngaged"
                                    className="form-control"
                                    value={contentEngaged}
                                    onChange={(e) => setContentEngaged(e.target.value)}
                                >
                                    <option value="">Select Content Type</option>
                                    <option value="Text-based posts">Text-based posts</option>
                                    <option value="Images and photos">Images and photos</option>
                                    <option value="Videos and Reels">Videos and Reels</option>
                                    <option value="Memes and humor">Memes and humor</option>
                                    <option value="News and articles">News and articles</option>
                                </select>
                            </div>
                        </div>

                        <div className="col-md-3 mb-3">
                            <div className="form-group">
                                <label htmlFor="influences">Filter by Influences:</label>
                                <select
                                    id="influences"
                                    className="form-control"
                                    value={influences}
                                    onChange={(e) => setInfluences(e.target.value)}
                                >
                                    <option value="">Select Influence</option>
                                    <option value="Content shared by friends">Content shared by friends</option>
                                    <option value="News and information">News and information</option>
                                    <option value="Entertainment content">Entertainment content</option>
                                    <option value="User interface and experience">User interface and experience</option>
                                    <option value="other">Other Reasons</option>
                                </select>
                            </div>
                        </div>

                        <div className="col-md-3 mb-3">
                            <div className="form-group">
                                <label htmlFor="contentCreationFrequency">Filter by Content Engaged:</label>
                                <select
                                    id="contentCreationFrequency"
                                    className="form-control"
                                    value={contentCreationFrequency}
                                    onChange={(e) => setContentCreationFrequency(e.target.value)}
                                >
                                    <option value="">Select Frequency</option>
                                    <option value="Daily">Daily</option>
                                    <option value="Weekly">Weekly</option>
                                    <option value="Monthly">Monthly</option>
                                    <option value="Rarely">Rarely</option>
                                    <option value="Never">Never</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-3 mb-3">
                            <div className="form-group">
                                <label htmlFor="deviceUsed">Filter by Device Used:</label>
                                <select
                                    id="deviceUsed"
                                    className="form-control"
                                    value={deviceUsed}
                                    onChange={(e) => setDeviceUsed(e.target.value)}
                                >
                                    <option value="">Select Device</option>
                                    <option value="Smartphone">Smartphone</option>
                                    <option value="Laptop">Laptop</option>
                                    <option value="Desktop computer">Desktop computer</option>
                                    <option value="Tablet">Tablet</option>
                                    <option value="other">Other Devices</option>
                                </select>
                            </div>
                        </div>

                        <div className="col-md-3 mb-3">
                            <div className="form-group">
                                <label htmlFor="mentalHealthImpact">Filter by Mental Health Impact:</label>
                                <select
                                    id="mentalHealthImpact"
                                    className="form-control"
                                    value={mentalHealthImpact}
                                    onChange={(e) => setMentalHealthImpact(e.target.value)}
                                >
                                    <option value="">Select Impact</option>
                                    <option value="Very positive">Very positive</option>
                                    <option value="Somewhat positive">Somewhat positive</option>
                                    <option value="Neutral">Neutral</option>
                                    <option value="Somewhat negative">Somewhat negative</option>
                                    <option value="Very negative">Very negative</option>
                                </select>
                            </div>
                        </div>

                        <div className="col-md-3 mb-3">
                            <div className="form-group">
                                <label htmlFor="followingCreators">Filter by Following Creators:</label>
                                <select
                                    id="followingCreators"
                                    className="form-control"
                                    value={followingCreators}
                                    onChange={(e) => setFollowingCreators(e.target.value)}
                                >
                                    <option value="">Select Following Frequency</option>
                                    <option value="Frequently">Frequently</option>
                                    <option value="Occasionally">Occasionally</option>
                                    <option value="No">No</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12 mt-2 mb-4">
                    <button className="btn btn-primary" style={{ marginRight: '10px' }} onClick={handleFilterClick}>Apply</button>
                    <button className="btn btn-secondary" onClick={clearFilters}>Clear</button>
                </div>
            </div>

            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Most used Social Media Platform</h5>

                    <div className="row mt-3">
                        <div className="col-md-12">
                            <Bar
                                data={{
                                    labels: mediaPlatformData.map((data) => data.label),
                                    datasets: [
                                        {
                                            label: '',
                                            data: mediaPlatformData.map((data) => data.count),
                                            backgroundColor: backgroundColors,
                                        },
                                    ],
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default MediaPlatformChart;
