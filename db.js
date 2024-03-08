const mysql = require('mysql2/promise');

const dbConfig = {
    host: 'blesfxrl4vbau3qf3rph-mysql.services.clever-cloud.com',
    user: 'uyvysyqkhvngead3',
    password: '6klYhnHRjvhm2W8bmX9l',
    database: 'blesfxrl4vbau3qf3rph',
    connectionLimit: 10,
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
