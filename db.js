const mysql = require('mysql2/promise');

const dbConfig = {
  host: 'localhost',
  user: 'u788954365_survey',
  password: 'nA=9iII@^ql',
  database: 'u788954365_survey',
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
