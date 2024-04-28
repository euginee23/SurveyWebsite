import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import apiUrl from '../../apiUrl';
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import ExcelDownload from '../components/downloadExcel';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MediaPlatformChart from '../dashboardComponents/socialMediaChart';
import StreamingPlatformChart from '../dashboardComponents/streamingPlatformChart';
import CommunicationPlatformChart from '../dashboardComponents/communicationPlatformChart';

const Dashboard = () => {
    const [totalResponses, setTotalResponses] = useState(0);
    const [lastDate, setLastDate] = useState('');
    const [selectedData, setSelectedData] = useState([]);
    const [initialLoad, setInitialLoad] = useState(true);
    const [surveyData, setSurveyData] = useState([]);
    const [userData, setPositionData] = useState([]);
    const [courseData, setCourseData] = useState([]);
    const [mediaPlatformData, setMediaPlatformData] = useState([]);
    const [loading, setLoading] = useState(false);

    const [minAge, setMinAge] = useState('');
    const [maxAge, setMaxAge] = useState('');
    const [gender, setGender] = useState('');
    const [position, setPosition] = useState('');
    const [course, setCourse] = useState('');
    const [showCourseDropdown, setShowCourseDropdown] = useState(false);

    const [studentMinAge, setStudentMinAge] = useState('');
    const [studentMaxAge, setStudentMaxAge] = useState('');
    const [studentGender, setStudentGender] = useState('');
    const [studentPosition, setStudentPosition] = useState('');

    const fetchData = async () => {
        try {
            setLoading(true);
            const positionResponse = await fetch(`${apiUrl}/api/getPositionChartData`);
            const positionData = await positionResponse.json();
            console.log('Position chart data updated:', positionData);
            setPositionData(positionData);

            const studentCourseResponse = await fetch(`${apiUrl}/api/getStudentCourseChartData`);
            const studentCourseData = await studentCourseResponse.json();
            console.log('Student course chart data updated:', studentCourseData);
            setCourseData(studentCourseData);

            const surveyResponses = await fetch(`${apiUrl}/api/getSurveyData`);
            const surveyData = await surveyResponses.json();
            console.log('Survey data updated:', surveyData);
            setSurveyData(surveyData);

            setSelectedData(mediaPlatformData);
            setLoading(false);
            notify('Chart data updated!');
        } catch (error) {
            setLoading(false);
            console.error('Error updating chart data:', error.message);
        }
    };

    useEffect(() => {
        const fetchTotalResponses = async () => {
            try {
                const response = await fetch(`${apiUrl}/api/getTotalResponses`);
                const data = await response.json();
                setTotalResponses(data.totalResponses);
                const formattedLastDate = formatDateString(data.lastDate);
                setLastDate(formattedLastDate);
            } catch (error) {
                console.error('Error fetching total responses:', error.message);
                Swal.fire({
                    icon: 'error',
                    title: 'Oh no',
                    text: 'There was an error fetching total responses!',
                });
            }
        };

        if (initialLoad) {
            fetchData();
            setInitialLoad(false);
        }

        fetchTotalResponses();
    }, [initialLoad]);

    useEffect(() => {
        if (loading) {
            Swal.fire({
                title: 'Loading',
                html: 'Please wait...',
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });
        } else {
            Swal.close();
        }
    }, [loading]);

    const notify = (message) => {
        toast.info(message);
    };

    const formatDateString = (dateString) => {
        const date = new Date(dateString);
        const formattedDate = new Intl.DateTimeFormat('en-US').format(date);
        return formattedDate;
    };

    const handleUpdateData = async () => {
        try {
            await fetchData();
        } catch (error) {
            console.error('Error updating chart data:', error.message);
        }
    };

    const handleSelectData = (event) => {
        setSelectedData(event.target.value);
    };

    defaults.responsive = true;

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

    const handlePositionChange = (e) => {
        setPosition(e.target.value);
        if (e.target.value === 'student') {
            setShowCourseDropdown(true);
        } else {
            setShowCourseDropdown(false);
        }
    };

    const handleFilterRespondents = async () => {
        try {
            setLoading(true);
            const queryParams = new URLSearchParams({
                minAge,
                maxAge,
                gender,
                position,
                course: position === 'student' ? course : undefined,
            });
            const response = await fetch(`${apiUrl}/api/getPositionChartData?${queryParams.toString()}`);
            const responseData = await response.json();
            console.log('Filtered position chart data:', responseData);
            setPositionData(responseData);
            setLoading(false);
            notify('Chart data updated!');
        } catch (error) {
            setLoading(false);
            console.error('Error filtering respondents:', error.message);
        }
    };

    const handleFilterCourse = async () => {
        try {
            setLoading(true);
            const queryParams = new URLSearchParams({
                minAge: studentMinAge,
                maxAge: studentMaxAge,
                gender: studentGender,
            });
            const response = await fetch(`${apiUrl}/api/getStudentCourseChartData?${queryParams.toString()}`);
            const responseData = await response.json();
            console.log('Filtered student course chart data:', responseData);
            setCourseData(responseData);
            setLoading(false);
            notify('Student course data updated!');
        } catch (error) {
            setLoading(false);
            console.error('Error filtering student course data:', error.message);
        }
    };

    const handleClearFilters = () => {
        setMinAge('');
        setMaxAge('');
        setGender('');
        setPosition('');
        setCourse('');
        setShowCourseDropdown(false);

        setStudentMinAge('');
        setStudentMaxAge('');
        setStudentGender('');
        setStudentPosition('');
    };

    return (
        <div className="container mt-4 mb-4">
            <div className="container mt-4" style={{ boxShadow: '0 5px 20px rgba(1, 1, 1, 0.16)', borderRadius: '8px', overflow: 'hidden', marginTop: '8px', marginBottom: 'auto', maxWidth: '1100px', padding: "30px" }}>
                <h2 className="mb-4">Survey Dashboard</h2>

                <div className="row">
                    <div className="col-md-4 mb-3">
                        <div className="card">
                            <div className="card-body">
                                <h5>Total Responses as of {lastDate}</h5>
                                <h1>{totalResponses}</h1>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4 mb-4">
                        <div className="card">
                            <div className="card-body">
                                <h5>Downloadables</h5>
                                <ExcelDownload surveyData={surveyData} />
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4 mb-4">
                        <div className="card">
                            <div className="card-body">
                                <h5>Actions</h5>
                                <button className="btn btn-success btn-lg mb-1 mt-1" onClick={handleUpdateData}>
                                    {loading ? 'Loading...' : 'Refresh Data'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-3 row">
                    <label className="col-sm-2 col-form-label"><h6>Select Data:</h6></label>
                    <div className="col-sm-10">
                        <select className="form-select" onChange={handleSelectData} value={selectedData}>
                            <option value="">Select Data</option>
                            <option value="socialMedia">Social Media</option>
                            <option value="streamingPlatform">Streaming Platform</option>
                            <option value="communicationPlatform">Communication Platform</option>
                        </select>
                    </div>
                </div>

                {selectedData === 'socialMedia' && <MediaPlatformChart title="Most used Social Media Platform" />}
                {selectedData === 'streamingPlatform' && <StreamingPlatformChart title="Most used Streaming Platform" />}
                {selectedData === 'communicationPlatform' && <CommunicationPlatformChart title="Most used Communication Platform" />}

                <div className="row">
                    <div className="col-md-6 mb-4">

                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title mb-4">Respondents Filtering:</h5>
                                <div className="row">

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
                                    {showCourseDropdown && (
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
                                    )}
                                </div>

                                <div className="form-group mt-3">
                                    <button className="btn btn-primary" style={{ marginRight: '10px' }} onClick={handleFilterRespondents}>Apply</button>
                                    <button className="btn btn-secondary" onClick={handleClearFilters}>Clear</button>
                                </div>

                            </div>
                        </div>

                        <div className="card mt-4">
                            <div className="card-body">
                                <h5 className="card-title">Respondents</h5>
                                <Bar
                                    data={{
                                        labels: userData.map((data) => data.label),
                                        datasets: [
                                            {
                                                label: "Instructors",
                                                data: userData.map((data) => (data.label === "instructor" ? data.count : 0)),
                                                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                                            },
                                            {
                                                label: "Students",
                                                data: userData.map((data) => (data.label === "student" ? data.count : 0)),
                                                backgroundColor: 'rgba(255, 159, 64, 0.6)',
                                            },
                                        ],
                                    }}
                                    options={{
                                        scales: {
                                            x: {
                                                stacked: true,
                                            },
                                            y: {
                                                stacked: true,
                                            },
                                        },
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 mb-4">

                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title mb-4">Students Filtering:</h5>
                                <div className="row">

                                    <div className="form-group">

                                        <label htmlFor="studentMinAge">Filter age range:</label>
                                        <div className="d-flex">
                                            <input
                                                type="number"
                                                id="studentMinAge"
                                                className="form-control mr-2"
                                                placeholder="Min Age"
                                                value={studentMinAge}
                                                onChange={(e) => setStudentMinAge(e.target.value)}
                                            />
                                            <span><h6> _ </h6></span>
                                            <input
                                                type="number"
                                                id="studentMaxAge"
                                                className="form-control ml-2"
                                                placeholder="Max Age"
                                                value={studentMaxAge}
                                                onChange={(e) => setStudentMaxAge(e.target.value)}
                                            />
                                        </div>
                                    </div>


                                    <div className="form-group">
                                        <label htmlFor="studentGender">Filter by Gender:</label>
                                        <select
                                            id="studentGender"
                                            className="form-control"
                                            value={studentGender}
                                            onChange={(e) => setStudentGender(e.target.value)}
                                        >
                                            <option value="">Select Gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                        </select>
                                    </div>

                                    <div className="form-group mt-3">
                                        <button className="btn btn-primary" style={{ marginRight: '10px' }} onClick={handleFilterCourse}>Apply</button>
                                        <button className="btn btn-secondary" onClick={handleClearFilters}>Clear</button>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="card mt-4">
                            <div className="card-body">
                                <h5 className="card-title">Student respondents from their respective courses</h5>
                                <Doughnut
                                    data={{
                                        labels: courseData.map((data) => data.label),
                                        datasets: [
                                            {
                                                data: courseData.map((data) => data.count),
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
        </div>
    );
};

export default Dashboard;
