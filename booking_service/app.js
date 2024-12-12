// Booking Service: app.js
const express = require('express');
const bookingRoutes = require('./routes/bookingRoutes');
const cors = require('cors'); // Import CORS

const app = express();
app.use(cors({
  origin: 'http://localhost:5173', // Replace with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
  credentials: true // If you need to allow credentials (cookies, authorization headers)
}));
// Middleware
app.use(express.json()); // Parse JSON bodies

// Use booking routes
app.use('/bookings', bookingRoutes);

// Start the server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/" ,(req,res) => {
  res.send("<h1>This is booking service Container running</h1>")
})
