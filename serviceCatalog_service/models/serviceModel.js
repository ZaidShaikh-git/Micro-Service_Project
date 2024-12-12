const { Pool } = require('pg');

// Database connection using environment variables
const pool = new Pool({
  connectionString: process.env.DATABASE_URL_SERVICE,
});

// Create table if it doesn't exist
const createTableIfNotExists = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS services (
      service_id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      description TEXT,
      category VARCHAR(50) NOT NULL,
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
// CRUD operations for services

// Get all services
const getServices = async () => {
  await createTableIfNotExists();  // Ensure the table is created
  try {
    const result = await pool.query('SELECT * FROM services');
    return result.rows;
  } catch (err) {
    throw new Error('Error fetching services: ' + err.message);
  }
};

// Get service by ID
const getServiceById = async (id) => {
  await createTableIfNotExists();  // Ensure the table is created
  try {
    const result = await pool.query('SELECT * FROM services WHERE service_id = $1', [id]);
    if (result.rows.length === 0) {
      throw new Error('Service not found');
    }
    return result.rows[0];
  } catch (err) {
    throw new Error('Error fetching service by ID: ' + err.message);
  }
};

// Create a new service
const createService = async (name, description, category) => {
  await createTableIfNotExists();  // Ensure the table is created
  try {
    const result = await pool.query(
      'INSERT INTO services (name, description, category) VALUES ($1, $2, $3) RETURNING *',
      [name, description, category]
    );
    return result.rows[0];
  } catch (err) {
    throw new Error('Error creating service: ' + err.message);
  }
};

// Update a service
const updateService = async (id, name, description, category) => {
  await createTableIfNotExists();  // Ensure the table is created
  try {
    const result = await pool.query(
      'UPDATE services SET name = $1, description = $2, category = $3 WHERE service_id = $4 RETURNING *',
      [name, description, category, id]
    );
    if (result.rows.length === 0) {
      throw new Error('Service not found');
    }
    return result.rows[0];
  } catch (err) {
    throw new Error('Error updating service: ' + err.message);
  }
};

// Delete a service
const deleteService = async (id) => {
  await createTableIfNotExists();  // Ensure the table is created
  try {
    const result = await pool.query('DELETE FROM services WHERE service_id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      throw new Error('Service not found');
    }
    return result.rows[0];
  } catch (err) {
    throw new Error('Error deleting service: ' + err.message);
  }
};

module.exports = {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
};
