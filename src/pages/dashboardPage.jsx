import React, { useState, useEffect } from 'react';
import apiUrl from '../../apiUrl';
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import ExcelDownload from '../components/downloadExcel';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {
    const [totalResponses, setTotalResponses] = useState(0);
    const [selectedData, setSelectedData] = useState([]);
    const [cardTitle, setCardTitle] = useState("Most used Social Media Platform");
    const [initialLoad, setInitialLoad] = useState(true);
    const [surveyData, setSurveyData] = useState([]);
    const [userData, setPositionData] = useState([]);
    const [courseData, setCourseData] = useState([]);
    const [mediaPlatformData, setMediaPlatformData] = useState([]);
    const [streamingPlatformData, setStreamingPlatformData] = useState([]);
    const [communicationPlatformData, setCommunicationPlatformData] = useState([]);

    const fetchData = async () => {
        try {
            const positionResponse = await fetch(`${apiUrl}/api/getPositionChartData`);
            const positionData = await positionResponse.json();
            console.log('Position chart data updated:', positionData);
            setPositionData(positionData);

            const mediaPlatformResponse = await fetch(`${apiUrl}/api/getMediaPlatformChartData`);
            const mediaPlatformData = await mediaPlatformResponse.json();
            console.log('Media platform chart data updated:', mediaPlatformData);
            setMediaPlatformData(mediaPlatformData);

            const streamingPlatformResponse = await fetch(`${apiUrl}/api/getStreamingPlatformChartData`);
            const streamingPlatformData = await streamingPlatformResponse.json();
            console.log('Streaming platform chart data updated:', streamingPlatformData);
            setStreamingPlatformData(streamingPlatformData);

            const communicationPlatformResponse = await fetch(`${apiUrl}/api/getCommuncationPlatformChartData`);
            const communicationPlatformData = await communicationPlatformResponse.json();
            console.log('Communication platform chart data updated:', communicationPlatformData);
            setCommunicationPlatformData(communicationPlatformData);

            const studentCourseResponse = await fetch(`${apiUrl}/api/getStudentCourseChartData`);
            const studentCourseData = await studentCourseResponse.json();
            console.log('Student course chart data updated:', studentCourseData);
            setCourseData(studentCourseData);

            const surveyResponses = await fetch(`${apiUrl}/api/getSurveyData`);
            const surveyData = await surveyResponses.json();
            console.log('Survey data updated:', surveyData);
            setSurveyData(surveyData);

            setSelectedData(mediaPlatformData);

            notify('Chart data updated!');
        } catch (error) {
            console.error('Error updating chart data:', error.message);
        }
    };
    
    useEffect(() => {
        const fetchTotalResponses = async () => {
            try {
                const response = await fetch(`${apiUrl}/api/getTotalResponses`);
                const data = await response.json();
                setTotalResponses(data.totalResponses);
            } catch (error) {
                console.error('Error fetching total responses:', error.message);
            }
        };

        if (initialLoad) {
            fetchData();
            setInitialLoad(false);
        }

        fetchTotalResponses();
    }, []);

    const notify = (message) => {
        toast.info(message);
    };

    const handleUpdateData = async () => {
        try {
            await fetchData();
            window.location.reload();
        } catch (error) {
            console.error('Error updating chart data:', error.message);
        }
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

    const filterChartData = (selected) => {
        switch (selected) {
            case 'media':
                setSelectedData(mediaPlatformData);
                setCardTitle("Most used Social Media Platform");
                break;
            case 'streaming':
                setSelectedData(streamingPlatformData);
                setCardTitle("Most used Streaming Platform");
                break;
            case 'communication':
                setSelectedData(communicationPlatformData);
                setCardTitle("Most used Communication Platform");
                break;
            default:
                setSelectedData(mediaPlatformData);
                setCardTitle("Most used Social Media Platform");
                break;
        }
    };

    return (
        <div className="container mt-4 mb-4">
            <div className="container mt-4" style={{ boxShadow: '0 5px 20px rgba(1, 1, 1, 0.16)', borderRadius: '8px', overflow: 'hidden', marginTop: '8px', marginBottom: 'auto', maxWidth: '1100px', padding: "30px" }}>
                <h2 className="mb-4">Survey Dashboard</h2>
    
                <div className="row">
                    <div className="col-md-4 mb-4">
                        <div className="card">
                            <div className="card-body">
                                <h5>Total Responses</h5>
                                <h3 className="mb-4">{totalResponses}</h3>
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
                                    Refresh Data
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
    
                <div className="mb-3 row">
                    <label className="col-sm-2 col-form-label"><h6>Select Data:</h6></label>
                    <div className="col-sm-10">
                        <select className="form-select" onChange={(e) => filterChartData(e.target.value)}>
                            <option value="media">Social Media</option>
                            <option value="streaming">Streaming</option>
                            <option value="communication">Communication</option>
                        </select>
                    </div>
                </div>
    
                <div className="col-md-12 mb-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">{cardTitle}</h5>
                            <Bar
                                data={{
                                    labels: selectedData.map((data) => data.label),
                                    datasets: [
                                        {
                                            label: '',
                                            data: selectedData.map((data) => data.count),
                                            backgroundColor: backgroundColors,
                                        },
                                    ],
                                }}
                            />
                        </div>
                    </div>
                </div>
    
                <div className="row">
                    <div className="col-md-6 mb-4">
                        <div className="card">
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
