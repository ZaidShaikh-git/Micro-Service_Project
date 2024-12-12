const express = require('express');
const cors = require('cors'); // Import CORS
const workerRoutes = require('./routes/workerRoutes');

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

// Enable CORS for all routes
app.use(cors({
  origin: 'http://localhost:5173', // Replace with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
  credentials: true // If you need to allow credentials (cookies, authorization headers)
}));

// Use the worker routes
app.use('/workers', workerRoutes);

// Default route to confirm the service is running
app.get("/", (req, res) => {
  res.send("<h1>This is worker service container running</h1>");
});

const port = process.env.PORT || 3003;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
