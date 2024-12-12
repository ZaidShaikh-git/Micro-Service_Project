// models/userModel.js
const { Pool } = require('pg');

// Create a new Pool using environment variables from Docker Compose
const pool = new Pool({
  connectionString: process.env.DATABASE_URL_user, // Passed by Docker Compose
});

// Create table if it doesn't exist
const createTableIfNotExists = async () => {
  const createTableQuery = `
      CREATE TABLE users (
        user_id SERIAL PRIMARY KEY,
        first_name VARCHAR(50) NOT NULL,
        last_name VARCHAR(50) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        phone VARCHAR(15) NOT NULL UNIQUE,
        role VARCHAR(10) NOT NULL,  -- e.g., 'user', 'worker'
        created_at TIMESTAMP DEFAULT NOW()
);
  `;
  try {
    await pool.query(createTableQuery);
    console.log('Services table is ready.');
  } catch (err) {
    throw new Error('Error creating services table: ' + err.message);
  }
};

createTableIfNotExists();
// CRUD operations

// Get all users
const getUsers = async () => {
  try {
    const result = await pool.query('SELECT * FROM users');
    return result.rows;
  } catch (err) {
    throw new Error('Error fetching users: ' + err.message);
  }
};

// Get user by ID
const getUserById = async (id) => {
  try {
    const result = await pool.query('SELECT * FROM users WHERE user_id = $1', [id]);
    if (result.rows.length === 0) {
      throw new Error('User not found');
    }
    return result.rows[0];
  } catch (err) {
    throw new Error('Error fetching user by ID: ' + err.message);
  }
};

// Create a new user
const createUser = async (first_name, last_name, email, password, phone, role) => {
  try {
    const result = await pool.query(
      'INSERT INTO users (first_name, last_name, email, password, phone, role) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [first_name, last_name, email, password, phone, role]
    );
    return result.rows[0];
  } catch (err) {
    throw new Error('Error creating user: ' + err.message);
  }
};

// Update a user
const updateUser = async (id, first_name, last_name, email, password, phone, role) => {
  try {
    const result = await pool.query(
      'UPDATE users SET first_name = $1, last_name = $2, email = $3, password = $4, phone = $5, role = $6 WHERE user_id = $7 RETURNING *',
      [first_name, last_name, email, password, phone, role, id]
    );
    if (result.rows.length === 0) {
      throw new Error('User not found');
    }
    return result.rows[0];
  } catch (err) {
    throw new Error('Error updating user: ' + err.message);
  }
};

// Delete a user
const deleteUser = async (id) => {
  try {
    const result = await pool.query('DELETE FROM users WHERE user_id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      throw new Error('User not found');
    }
    return result.rows[0];
  } catch (err) {
    throw new Error('Error deleting user: ' + err.message);
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
