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
      gender,
      age,
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
      question9,
      question10,
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
        'INSERT INTO users (firstName, lastName, gender, age, position, course, email) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [firstName, lastName, gender, age, position, course, email]
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
        'INSERT INTO survey (user_id, question1_response, question2_response, question3_response, question4_response, question5_response, question6_response, question7_response, question8_response, question9_response, question10_response) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [userId, question1Response, question2, question3Response, question4Response, question5, question6Response, question7, question8Response, question9, question10]
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
    const connection = await db.getConnection();
    const [existingUser] = await connection.query('SELECT * FROM users WHERE email = ?', [email]);

    connection.release();

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

    const [lastDateResult] = await connection.query('SELECT MAX(created_at) AS lastDate FROM survey');
    const lastDate = lastDateResult[0].lastDate;

    connection.release();

    res.status(200).json({ totalResponses, lastDate });
  } catch (error) {
    console.error('Error fetching total responses:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// USER POSITION RETRIEVE
app.get('/api/getPositionChartData', async (req, res) => {
  try {
      const connection = await db.getConnection();
      const { minAge, maxAge, gender, position, course } = req.query;

      let whereClause = '';
      let params = [];

      if (minAge && maxAge) {
          whereClause += ' WHERE age BETWEEN ? AND ?';
          params.push(minAge, maxAge);
      }
      if (gender) {
          if (whereClause) whereClause += ' AND';
          else whereClause += ' WHERE';
          whereClause += ' gender = ?';
          params.push(gender);
      }
      if (position) {
          if (whereClause) whereClause += ' AND';
          else whereClause += ' WHERE';
          whereClause += ' position = ?';
          params.push(position);
      }
      if (position === 'student' && course) {
          if (whereClause) whereClause += ' AND';
          else whereClause += ' WHERE';
          whereClause += ' course = ?';
          params.push(course);
      }

      const query = `
          SELECT position as label, COUNT(*) as count
          FROM users
          ${whereClause}
          GROUP BY position
      `;

      const [respondents] = await connection.query(query, params);

      connection.release();

      res.status(200).json(respondents);
  } catch (error) {
      console.error('Error fetching filtered respondents:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET MEDIA PLATFORM
app.get('/api/getMediaPlatformChartData', async (req, res) => {
  try {
    const connection = await db.getConnection();
    const { minAge, maxAge, gender, position, course, hoursSpent, contentEngaged, influences, contentCreationFrequency, deviceUsed, mentalHealthImpact, followingCreators } = req.query;

    let whereClause = '';
    let params = [];
    if (minAge && maxAge) {
      whereClause += ' WHERE age BETWEEN ? AND ?';
      params.push(minAge, maxAge);
    }
    if (gender) {
      if (whereClause) whereClause += ' AND';
      else whereClause += ' WHERE';
      whereClause += ' gender = ?';
      params.push(gender);
    }
    if (position) {
      if (whereClause) whereClause += ' AND';
      else whereClause += ' WHERE';
      whereClause += ' position = ?';
      params.push(position);
    }
    if (position === 'student' && course) {
      if (whereClause) whereClause += ' AND';
      else whereClause += ' WHERE';
      whereClause += ' course = ?';
      params.push(course);
    }

    if (hoursSpent) {
      if (whereClause) whereClause += ' AND';
      else whereClause += ' WHERE';
      whereClause += ' question2_response = ?';
      params.push(hoursSpent);
    }
    if (contentEngaged) {
      if (whereClause) whereClause += ' AND';
      else whereClause += ' WHERE';
      whereClause += ' question5_response = ?';
      params.push(contentEngaged);
    }
    if (influences) {
      if (whereClause) whereClause += ' AND';
      else whereClause += ' WHERE';
      whereClause += ' question6_response = ?';
      params.push(influences);
    }
    if (contentCreationFrequency) {
      if (whereClause) whereClause += ' AND';
      else whereClause += ' WHERE';
      whereClause += ' question7_response = ?';
      params.push(contentCreationFrequency);
    }
    if (deviceUsed) {
      if (whereClause) whereClause += ' AND';
      else whereClause += ' WHERE';
      whereClause += ' question8_response = ?';
      params.push(deviceUsed);
    }
    if (mentalHealthImpact) {
      if (whereClause) whereClause += ' AND';
      else whereClause += ' WHERE';
      whereClause += ' question9_response = ?';
      params.push(mentalHealthImpact);
    }
    if (followingCreators) {
      if (whereClause) whereClause += ' AND';
      else whereClause += ' WHERE';
      whereClause += ' question10_response = ?';
      params.push(followingCreators);
    }

    const query = `
      SELECT question1_response as label, COUNT(*) as count
      FROM survey
      LEFT JOIN users ON survey.user_id = users.user_id
      ${whereClause}
      GROUP BY question1_response
    `;

    const [mediaPlatformCounts] = await connection.query(query, params);

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
    const { minAge, maxAge, gender, position, course, hoursSpent, contentEngaged, influences, contentCreationFrequency, deviceUsed, mentalHealthImpact, followingCreators } = req.query;

    let whereClause = '';
    let params = [];
    if (minAge && maxAge) {
      whereClause += ' WHERE age BETWEEN ? AND ?';
      params.push(minAge, maxAge);
    }
    if (gender) {
      if (whereClause) whereClause += ' AND';
      else whereClause += ' WHERE';
      whereClause += ' gender = ?';
      params.push(gender);
    }
    if (position) {
      if (whereClause) whereClause += ' AND';
      else whereClause += ' WHERE';
      whereClause += ' position = ?';
      params.push(position);
    }
    if (position === 'student' && course) {
      if (whereClause) whereClause += ' AND';
      else whereClause += ' WHERE';
      whereClause += ' course = ?';
      params.push(course);
    }

    if (hoursSpent) {
      if (whereClause) whereClause += ' AND';
      else whereClause += ' WHERE';
      whereClause += ' question2_response = ?';
      params.push(hoursSpent);
    }
    if (contentEngaged) {
      if (whereClause) whereClause += ' AND';
      else whereClause += ' WHERE';
      whereClause += ' question5_response = ?';
      params.push(contentEngaged);
    }
    if (influences) {
      if (whereClause) whereClause += ' AND';
      else whereClause += ' WHERE';
      whereClause += ' question6_response = ?';
      params.push(influences);
    }
    if (contentCreationFrequency) {
      if (whereClause) whereClause += ' AND';
      else whereClause += ' WHERE';
      whereClause += ' question7_response = ?';
      params.push(contentCreationFrequency);
    }
    if (deviceUsed) {
      if (whereClause) whereClause += ' AND';
      else whereClause += ' WHERE';
      whereClause += ' question8_response = ?';
      params.push(deviceUsed);
    }
    if (mentalHealthImpact) {
      if (whereClause) whereClause += ' AND';
      else whereClause += ' WHERE';
      whereClause += ' question9_response = ?';
      params.push(mentalHealthImpact);
    }
    if (followingCreators) {
      if (whereClause) whereClause += ' AND';
      else whereClause += ' WHERE';
      whereClause += ' question10_response = ?';
      params.push(followingCreators);
    }

    const query = `
      SELECT question4_response as label, COUNT(*) as count
      FROM survey
      LEFT JOIN users ON survey.user_id = users.user_id
      ${whereClause}
      GROUP BY question4_response
    `;

    const [mediaPlatformCounts] = await connection.query(query, params);

    connection.release();

    res.status(200).json(mediaPlatformCounts);
  } catch (error) {
    console.error('Error fetching communication platform chart data:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// GET STREAMING PLATFORM
app.get('/api/getStreamingPlatformChartData', async (req, res) => {
  try {
    const connection = await db.getConnection();
    const { minAge, maxAge, gender, position, course, hoursSpent, contentEngaged, influences, contentCreationFrequency, deviceUsed, mentalHealthImpact, followingCreators } = req.query;

    let whereClause = '';
    let params = [];
    if (minAge && maxAge) {
      whereClause += ' WHERE age BETWEEN ? AND ?';
      params.push(minAge, maxAge);
    }
    if (gender) {
      if (whereClause) whereClause += ' AND';
      else whereClause += ' WHERE';
      whereClause += ' gender = ?';
      params.push(gender);
    }
    if (position) {
      if (whereClause) whereClause += ' AND';
      else whereClause += ' WHERE';
      whereClause += ' position = ?';
      params.push(position);
    }
    if (position === 'student' && course) {
      if (whereClause) whereClause += ' AND';
      else whereClause += ' WHERE';
      whereClause += ' course = ?';
      params.push(course);
    }

    if (hoursSpent) {
      if (whereClause) whereClause += ' AND';
      else whereClause += ' WHERE';
      whereClause += ' question2_response = ?';
      params.push(hoursSpent);
    }
    if (contentEngaged) {
      if (whereClause) whereClause += ' AND';
      else whereClause += ' WHERE';
      whereClause += ' question5_response = ?';
      params.push(contentEngaged);
    }
    if (influences) {
      if (whereClause) whereClause += ' AND';
      else whereClause += ' WHERE';
      whereClause += ' question6_response = ?';
      params.push(influences);
    }
    if (contentCreationFrequency) {
      if (whereClause) whereClause += ' AND';
      else whereClause += ' WHERE';
      whereClause += ' question7_response = ?';
      params.push(contentCreationFrequency);
    }
    if (deviceUsed) {
      if (whereClause) whereClause += ' AND';
      else whereClause += ' WHERE';
      whereClause += ' question8_response = ?';
      params.push(deviceUsed);
    }
    if (mentalHealthImpact) {
      if (whereClause) whereClause += ' AND';
      else whereClause += ' WHERE';
      whereClause += ' question9_response = ?';
      params.push(mentalHealthImpact);
    }
    if (followingCreators) {
      if (whereClause) whereClause += ' AND';
      else whereClause += ' WHERE';
      whereClause += ' question10_response = ?';
      params.push(followingCreators);
    }

    const query = `
      SELECT question3_response as label, COUNT(*) as count
      FROM survey
      LEFT JOIN users ON survey.user_id = users.user_id
      ${whereClause}
      GROUP BY question3_response
    `;

    const [mediaPlatformCounts] = await connection.query(query, params);

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
    const { minAge, maxAge, gender, course } = req.query;

    let whereClause = 'WHERE position = "student"';
    let params = [];

    if (minAge && maxAge) {
      whereClause += ' AND age BETWEEN ? AND ?';
      params.push(minAge, maxAge);
    }
    if (gender) {
      whereClause += ' AND gender = ?';
      params.push(gender);
    }

    const query = `
      SELECT course as label, COUNT(course) as count 
      FROM users 
      ${whereClause} 
      GROUP BY course
    `;

    const [studentCourseCounts] = await connection.query(query, params);

    connection.release();

    res.status(200).json(studentCourseCounts);
  } catch (error) {
    console.error('Error fetching filtered student course chart data:', error.message);
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
             question8_response as device,
             question9_response as impact,
             question10_response as following
      FROM survey
    `);

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