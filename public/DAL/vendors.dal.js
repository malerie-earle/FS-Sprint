// vendors.dal.js

const { Pool } = require('pg');

// Database connection details
const pool = new Pool({
  user: 'Postgres',
  host: 'localhost',
  database: 'Newfie Nook',
  password: 'Alphaomega24!',
  port: 5433,
});

// Function to fetch vendors from the database
const getVendors = async () => {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM vendors');
    return result.rows;
  } catch (error) {
    console.error('Error fetching vendors:', error);
    throw new Error('Failed to fetch vendors from the database');
  } finally {
    client.release();
  }
};

module.exports = { getVendors };
