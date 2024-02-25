// customers.dal.js

const { Pool } = require('pg');

// Database connection details
const pool = new Pool({
  user: 'Postgres',
  host: 'localhost',
  database: 'Newfie Nook',
  password: 'Alphaomega24!',
  port: 5433,
});

// Function to fetch customers from the database
const getCustomers = async () => {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM customers');
    return result.rows;
  } finally {
    client.release();
  }
};

module.exports = { getCustomers };
