// db.js
const { Pool } = require('pg');

// Database connection details
const pool = new Pool({
  user: 'malerie',
  host: 'localhost',
  database: 'NewfieNookDB',
  password: 'password',
  port: 5050
});
module.exports = pool;