// Booking Service: app.js
const express = require('express');
const { Pool } = require('pg');

const app = express();
app.use(express.json());

app.get("/" ,(req,res) => {
  res.send("<h1>This is booking service Container running</h1>")
})

// PostgreSQL setup
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// Create a booking
app.post('/bookings', async (req, res) => {
  const { serviceId, userId, bookingDate, address } = req.body;
  const result = await pool.query(
    'INSERT INTO bookings (service_id, user_id, booking_date, address) VALUES ($1, $2, $3, $4) RETURNING *',
    [serviceId, userId, bookingDate, address]
  );
  res.json(result.rows[0]);
});

// Fetch bookings for a user
app.get('/bookings/:userId', async (req, res) => {
  const { userId } = req.params;
  const result = await pool.query('SELECT * FROM bookings WHERE user_id = $1', [userId]);
  res.json(result.rows);
});

// Start server
app.listen(3002, () => console.log('Booking service running on port 3002'));
