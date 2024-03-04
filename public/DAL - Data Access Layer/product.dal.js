// products.dal.js

const { Pool } = require('pg');

// Database connection details
const pool = new Pool({
  user: 'malerie',
  host: 'localhost',
  database: 'NewfieNookDB',
  password: 'password',
  port: 5050
});


// Function to fetch products from the database
const getProducts = async () => {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM products');
    return result.rows;
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    client.release();
  }
};

module.exports = { getProducts };
