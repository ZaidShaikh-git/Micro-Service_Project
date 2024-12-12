const { Pool } = require('pg');

// Create a new Pool using environment variables from Docker Compose
const pool = new Pool({
  connectionString: process.env.DATABASE_URL_worker,
});

// Create table if it doesn't exist
const createTableIfNotExists = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS workers (
        worker_id SERIAL PRIMARY KEY,
        name VARCHAR(40) NOT NULL,  
        skill VARCHAR(100) NOT NULL,
        rating DECIMAL(3, 2) DEFAULT 0.0,
        verified BOOLEAN DEFAULT FALSE,
        bio TEXT,
        price DECIMAL(10, 2) NOT NULL DEFAULT 0.0  
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

// CRUD operations for workers

// Get all workers
const getWorkers = async () => {
  try {
    const result = await pool.query('SELECT * FROM workers');
    return result.rows;
  } catch (err) {
    throw new Error('Error fetching workers: ' + err.message);
  }
};

// Get worker by ID
const getWorkerById = async (id) => {
  try {
    const result = await pool.query('SELECT * FROM workers WHERE worker_id = $1', [id]);
    
    if (result.rows.length === 0) {
      throw new Error('Worker not found');
    }
    return result.rows;
  } catch (err) {
    throw new Error('Error fetching worker by ID: ' + err.message);
  }
};
// Get workers by skill
const getWorkerBySkill = async (skill) => {
  try {
    console.log("this is before worker serojgaerjglkgjby id:" , skill)
    const result = await pool.query('SELECT * FROM workers WHERE skill = $1', [skill]);
    if (result.rows.length === 0) {
      throw new Error('Worker not found');
    }
    return result.rows;
  } catch (err) {
    throw new Error('Error fetching worker by ID: ' + err.message);
  }
};

// Create a new worker
const createWorker = async (name, skill, bio, rating, verified, price) => {
  try {
    const result = await pool.query(
      'INSERT INTO workers (name, skill, bio, rating, verified, price) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [name, skill, bio, rating, verified, price]  // Ensure correct types are passed
    );
    return result.rows[0];
  } catch (err) {
    throw new Error('Error creating worker: ' + err.message);
  }
};


// Update a worker
const updateWorker = async (id, name, skill, rating, verified, bio, price) => {
  try {
    const result = await pool.query(
      'UPDATE workers SET name = $1, skill = $2, rating = $3, verified = $4, bio = $5, price = $6 WHERE worker_id = $7 RETURNING *',
      [name, skill, rating, verified, bio, price, id]  // Include price
    );
    if (result.rows.length === 0) {
      throw new Error('Worker not found');
    }
    return result.rows[0];
  } catch (err) {
    throw new Error('Error updating worker: ' + err.message);
  }
};

// Delete a worker
const deleteWorker = async (id) => {
  try {
    const result = await pool.query('DELETE FROM workers WHERE worker_id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      throw new Error('Worker not found');
    }
    return result.rows[0];
  } catch (err) {
    throw new Error('Error deleting worker: ' + err.message);
  }
};

module.exports = {
  getWorkers,
  getWorkerBySkill,
  getWorkerById,
  createWorker,
  updateWorker,
  deleteWorker,
};
