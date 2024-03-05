const mysql = require('mysql2/promise');

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'survey_website_db',
    connectionLimit: 100,
};

const pool = mysql.createPool(dbConfig);

pool.getConnection()
    .then(connection => {
        console.log('Connected to MySQL database');
        connection.release(); 
    })
    .catch(error => {
        console.error('MySQL connection error:', error.message);
    });

module.exports = pool;
