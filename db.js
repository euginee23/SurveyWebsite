const mysql = require('mysql2/promise');

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'survey_website_db',
  connectionLimit: 10,
  waitForConnections: true, 
  queueLimit: 0, 
};

const pool = mysql.createPool(dbConfig);

const getConnection = async () => {
  try {
    const connection = await pool.getConnection();

    return connection;
  } catch (error) {
    console.error('Error acquiring database connection:', error.message);
    throw error;
  }
};

module.exports = { pool, getConnection };
