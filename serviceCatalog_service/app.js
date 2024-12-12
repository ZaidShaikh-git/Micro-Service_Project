const express = require('express');
const cors = require('cors'); // Import CORS
const serviceRoutes = require('./routes/serviceRoutes');

const app = express();
app.use(express.json());  // Middleware to parse JSON

// Enable CORS for all routes
app.use(cors());

// Use routes
app.use('/service', serviceRoutes);

// Default route to confirm the service is running
app.get("/", (req, res) => {
  res.send("<h1>This is service catalog container running</h1>");
});

// Start server
const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
