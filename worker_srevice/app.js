// Worker Management Service: app.js
const express = require('express');
const { Pool } = require('pg');

const app = express();
app.use(express.json());

// PostgreSQL setup
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// Register a worker
app.post('/workers', async (req, res) => {
  const { userId, qualifications } = req.body;
  const result = await pool.query(
    'INSERT INTO workers (user_id, qualifications) VALUES ($1, $2) RETURNING *',
    [userId, qualifications]
  );
  res.json(result.rows[0]);
});

// Fetch all workers
app.get('/workers', async (req, res) => {
  const result = await pool.query('SELECT * FROM workers');
  res.json(result.rows);
});

// Start server
app.listen(3004, () => console.log('Worker management service running on port 3004'));
