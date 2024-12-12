// // User Service: app.js
// const express = require('express');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
// const { Pool } = require('pg');

// const app = express();
// app.use(express.json());

// app.get("/" ,(req,res) => {
//   res.send("<h1>This is user servi1111111111111111ce Container running</h1>")
// })

// // PostgreSQL setup
// // const pool = new Pool({ connectionString: process.env.DATABASE_URL,});

// const createUsersTable = async () => {
//   try {
//     await pool.query(`
//       -- User Service Database
//       CREATE TABLE users (
//         user_id SERIAL PRIMARY KEY,
//         first_name VARCHAR(50) NOT NULL,
//         last_name VARCHAR(50) NOT NULL,
//         email VARCHAR(100) NOT NULL UNIQUE,
//         password VARCHAR(255) NOT NULL,  -- Hashed password
//         phone VARCHAR(15) NOT NULL UNIQUE,
//         role VARCHAR(10) NOT NULL,  -- 'user' or 'worker'
//         created_at TIMESTAMP DEFAULT NOW()
// );

//     `);
//     console.log("Users table created or already exists.");
//   } catch (err) {
//     console.error("Error creating users table:", err);
//   }
// };

// // Call the function to ensure the table is created at startup
// createUsersTable();


// // Fetch all users
// app.get('/user', async (req, res) => {
//   try {
//     const result = await pool.query('SELECT * FROM users'); // Query to fetch all users
//     res.json(result.rows); // Send the data as JSON
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Error fetching users' });
//   }
// });


// pool.query('SELECT NOW()', (err,res) =>{
//   if(err){
//     console.log('connection error:', err.stack);
//   }
//   else{
//     console.log('connection succesful:', res.rows[0]);
//   }
//   // pool.end();
// })

// // User registration (insert data into users table)
// app.post('/register', async (req, res) => {
//   const { first_name, last_name, email, password, phone, role } = req.body;

//   if (!first_name || !last_name || !email || !password || !phone || !role) {
//     return res.status(400).json({ error: 'Missing required fields' });
//   }

//   try {
//     // Hash the password before storing it
//     const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

//     // Insert new user into the database
//     const result = await pool.query(
//       'INSERT INTO users (first_name, last_name, email, password, phone, role) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
//       [first_name, last_name, email, hashedPassword, phone, role]
//     );

//     res.status(201).json(result.rows[0]); // Send the inserted user data as the response
//   } catch (err) {
//     console.error('Error registering user:', err);
//     res.status(500).json({ error: 'Error registering user' });
//   }
// });



// // User login
// // app.post('/login', async (req, res) => {
// //   const { username, password } = req.body;
// //   const user = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
  
// //   if (user && await bcrypt.compare(password, user.rows[0].password)) {
// //     const token = jwt.sign({ userId: user.rows[0].id, role: user.rows[0].role }, process.env.JWT_SECRET);
// //     res.json({ token });
// //   } else {
// //     res.status(401).json({ error: 'Invalid credentials' });
// //   }
// // });

// // Start server
// app.listen(3001, () => console.log('User service running on port 3001'));


// app.js
const express = require('express');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json());  // Middleware to parse JSON

// Use routes
app.use('/userService', userRoutes);

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get("/" ,(req,res) => {
  res.send("<h1>This is user service Container running</h1>")
})

