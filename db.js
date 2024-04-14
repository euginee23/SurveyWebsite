const mysql = require('mysql2/promise');

// Configuration for your database
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'survey_website_db',
  connectionLimit: 10, // Maximum number of connections in the pool
  waitForConnections: true, // Whether the pool should wait for connections to become available
  queueLimit: 0, // Maximum number of connection requests the pool should queue
};

// Create a connection pool
const pool = mysql.createPool(dbConfig);

// Function to acquire a connection from the pool
const getConnection = async () => {
  try {
    // Acquire a connection from the pool
    const connection = await pool.getConnection();

    return connection;
  } catch (error) {
    // Handle connection errors
    console.error('Error acquiring database connection:', error.message);
    throw error;
  }
};

module.exports = { pool, getConnection };
