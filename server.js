const express = require('express');
const cors = require('cors');
const db = require('./db');
const nodemailer = require('nodemailer');
const app = express();
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'molaveengineering@gmail.com',
    pass: 'cddz kzfq fbqm pcov',
  },
});

// FORM SUBMISSION
app.post('/api/submitForm', async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      position,
      course,
      email,
      question1,
      otherResponse,
      question2,
      question3,
      otherSpecify3,
      question4,
      communicationApp,
      otherSpecify4,
      question5,
      question6,
      otherSpecify6,
      question7,
      question8,
      otherSpecify8,
    } = req.body;

    const connection = await db.getConnection();
    await connection.beginTransaction();

    try {
      const [existingUser] = await connection.query('SELECT * FROM users WHERE email = ?', [email]);

      if (existingUser.length > 0) {
        await connection.rollback();
        connection.release();

        res.status(400).json({ success: false, message: 'Email is already in use' });
        return;
      }

      const [userData] = await connection.query(
        'INSERT INTO users (firstName, lastName, position, course, email) VALUES (?, ?, ?, ?, ?)',
        [firstName, lastName, position, course, email]
      );

      const userId = userData.insertId;

      let question1Response;

      if (question1 === 'Other') {
        question1Response = otherResponse;
      } else {
        question1Response = question1;
      }

      let question3Response;

      if (question3 === 'Other') {
        question3Response = otherSpecify3;
      } else {
        question3Response = question3;
      }

      let question4Response;

      if (question4 === 'Messaging apps selection' || question4 === 'Video calls selection' || question4 === 'Email selection') {
        question4Response = communicationApp;
      } else if (question4 === 'Other') {
        question4Response = otherSpecify4;
      } else {
        question4Response = question4;
      }

      let question6Response;

      if (question6 === 'Other') {
        question6Response = otherSpecify6;
      } else {
        question6Response = question6;
      }

      let question8Response;

      if (question8 === 'Other') {
        question8Response = otherSpecify8;
      } else {
        question8Response = question8;
      }

      await connection.query(
        'INSERT INTO survey (user_id, question1_response, question2_response, question3_response, question4_response, question5_response, question6_response, question7_response, question8_response) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [userId, question1Response, question2, question3Response, question4Response, question5, question6Response, question7, question8Response]
      );

      await connection.commit();
      connection.release();
      sendThankYouEmail(email);

      res.status(200).json({ success: true, message: 'Form submitted successfully!' });
    } catch (error) {
      await connection.rollback();
      connection.release();

      console.error(error);

      res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
    }
  } catch (error) {
    console.error(error);

    res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
  }
});

// CHECK EMAIL
app.post('/api/checkEmail', async (req, res) => {
  try {
    const { email } = req.body;

    const [existingUser] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

    if (existingUser.length > 0) {
      res.json({ emailInUse: true });
    } else {
      res.json({ emailInUse: false });
    }
  } catch (error) {
    console.error('Error checking email:', error.message);
    res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
  }
});

// EMAIL STRUCTURE
async function sendThankYouEmail(email) {
  try {
    const mailOptions = {
      from: 'molaveengineering@gmail.com',
      to: email,
      subject: 'Identifying the Most Used Online Platform Digital Media at Western Mindanao State University Pagadian',
      text: 'Thank you for responding to our survey. We appreciate your feedback!',
    };

    const info = await transporter.sendMail(mailOptions);

    console.log('Email sent:', info.response);

    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}

// GET TOTAL RESPONSES
app.get('/api/getTotalResponses', async (req, res) => {
  try {
    const connection = await db.getConnection();
    const [result] = await connection.query('SELECT COUNT(*) AS totalResponses FROM survey');

    const totalResponses = result[0].totalResponses;

    connection.release();

    res.status(200).json({ totalResponses });
  } catch (error) {
    console.error('Error fetching total responses:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// USER POSITION RETRIEVE
app.get('/api/getPositionChartData', async (req, res) => {
  try {
    const connection = await db.getConnection();

    const [instructorCount] = await connection.query('SELECT COUNT(*) as count FROM users WHERE position = "instructor"');
    const [studentCount] = await connection.query('SELECT COUNT(*) as count FROM users WHERE position = "student"');

    const instructorData = {
      label: 'instructor',
      count: instructorCount[0].count,
    };

    const studentData = {
      label: 'student',
      count: studentCount[0].count,
    };

    const chartData = [instructorData, studentData];

    // JSON WRITE TO PATH
    const jsonDataPath = path.join(__dirname, 'src', 'pages', 'data', 'usersData.json');
    fs.writeFileSync(jsonDataPath, JSON.stringify(chartData, null, 2), 'utf-8');

    connection.release();

    res.status(200).json(chartData);
  } catch (error) {
    console.error('Error fetching position chart data:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET MEDIA PLATFORM
app.get('/api/getMediaPlatformChartData', async (req, res) => {
  try {
    const connection = await db.getConnection();

    const [mediaPlatformCounts] = await connection.query(
      'SELECT question1_response as label, COUNT(*) as count FROM survey GROUP BY question1_response'
    );

    // JSON WRITE TO PATH
    const jsonDataPath = path.join(__dirname, 'src', 'pages', 'data', 'mediaPlatformData.json');
    fs.writeFileSync(jsonDataPath, JSON.stringify(mediaPlatformCounts, null, 2), 'utf-8');

    connection.release();

    res.status(200).json(mediaPlatformCounts);
  } catch (error) {
    console.error('Error fetching media platform chart data:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET COMMUNCATION PLATFORM
app.get('/api/getCommuncationPlatformChartData', async (req, res) => {
  try {
    const connection = await db.getConnection();

    const [mediaPlatformCounts] = await connection.query(
      'SELECT question4_response as label, COUNT(*) as count FROM survey GROUP BY question4_response'
    );

    // JSON WRITE TO PATH
    const jsonDataPath = path.join(__dirname, 'src', 'pages', 'data', 'communicationPlatformData.json');
    fs.writeFileSync(jsonDataPath, JSON.stringify(mediaPlatformCounts, null, 2), 'utf-8');

    connection.release();

    res.status(200).json(mediaPlatformCounts);
  } catch (error) {
    console.error('Error fetching communcation platform chart data:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET STREAMING PLATFORM
app.get('/api/getStreamingPlatformChartData', async (req, res) => {
  try {
    const connection = await db.getConnection();

    const [mediaPlatformCounts] = await connection.query(
      'SELECT question3_response as label, COUNT(*) as count FROM survey GROUP BY question3_response'
    );

    // JSON WRITE TO PATH
    const jsonDataPath = path.join(__dirname, 'src', 'pages', 'data', 'streamingPlatformData.json');
    fs.writeFileSync(jsonDataPath, JSON.stringify(mediaPlatformCounts, null, 2), 'utf-8');

    connection.release();

    res.status(200).json(mediaPlatformCounts);
  } catch (error) {
    console.error('Error fetching streaming platform chart data:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET STUDENT COURSE
app.get('/api/getStudentCourseChartData', async (req, res) => {
  try {
    const connection = await db.getConnection();

    const [studentCourseCounts] = await connection.query(
      'SELECT course as label, COUNT(course) as count FROM users WHERE position = "student" GROUP BY course'
    );

    // JSON WRITE TO PATH
    const jsonDataPath = path.join(__dirname, 'src', 'pages', 'data', 'studentCourseData.json');
    fs.writeFileSync(jsonDataPath, JSON.stringify(studentCourseCounts, null, 2), 'utf-8');

    connection.release();

    res.status(200).json(studentCourseCounts);
  } catch (error) {
    console.error('Error fetching student course chart data:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET SURVEY DATA
app.get('/api/getSurveyData', async (req, res) => {
  try {
    const connection = await db.getConnection();

    const [surveyData] = await connection.query(`
      SELECT ROW_NUMBER() OVER (ORDER BY user_id) as respondent,
             question1_response as social_media,
             question2_response as hours,
             question3_response as streaming,
             question4_response as communication,
             question5_response as content,
             question6_response as influenced,
             question7_response as sharing_content,
             question8_response as device
      FROM survey
    `);

    // JSON WRITE TO PATH (Async)
    const jsonDataPath = path.join(__dirname, 'src', 'pages', 'data', 'surveyData.json');
    fs.promises.writeFile(jsonDataPath, JSON.stringify(surveyData, null, 2), 'utf-8');

    connection.release();

    res.status(200).json(surveyData);
  } catch (error) {
    console.error('Error fetching survey data:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});