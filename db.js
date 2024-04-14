const mysql = require('mysql2/promise');

const dbConfig = {
  host: 'blesfxrl4vbau3qf3rph-mysql.services.clever-cloud.com',
  user: 'uyvysyqkhvngead3',
  password: '6klYhnHRjvhm2W8bmX9l',
  database: 'blesfxrl4vbau3qf3rph',
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
