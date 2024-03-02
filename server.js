const express = require('express');
const cors = require('cors');
const db = require('./db');
const nodemailer = require('nodemailer');
const app = express();

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
      subject: 'Identifying the Most Used Online Platform Digital Services at Western Mindanao State University Pagadian',
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


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
