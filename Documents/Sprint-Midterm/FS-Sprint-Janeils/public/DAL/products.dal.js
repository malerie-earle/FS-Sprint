// products.dal.js

const { Pool } = require('pg');

// Database connection details
const pool = new Pool({
  user: 'Postgres',
  host: 'localhost',
  database: 'Newfie Nook',
  password: 'Alphaomega24!',
  port: 5433,
});

// Function to fetch products from the database
const getProducts = async () => {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM products');
    return result.rows;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Failed to fetch products from the database');
  } finally {
    client.release();
  }
};

module.exports = { getProducts };
