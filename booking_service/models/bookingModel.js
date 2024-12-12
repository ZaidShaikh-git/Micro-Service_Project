// models/bookingModel.js
const { Pool } = require('pg');

// Create a new Pool using environment variables from Docker Compose
const pool = new Pool({
  connectionString: process.env.DATABASE_URL_booking, // Passed by Docker Compose
});

// Function to create the bookings table if it doesn't exist
const createBookingsTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS bookings (
      booking_id SERIAL PRIMARY KEY,
      user_id INT NOT NULL,
      worker_id INT NOT NULL,
      service_name VARCHAR(40) NOT NULL,
      booking_date DATE NOT NULL,
      status VARCHAR(20) NOT NULL,
      city VARCHAR(100),
      address VARCHAR(255),
      pin_code VARCHAR(20),
      task_size VARCHAR(10),
      task_details TEXT,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `;
  try {
    await pool.query(query);
    console.log('Bookings table created or already exists.');
  } catch (err) {
    console.error('Error creating bookings table:', err.message);
  }
};


// Call the function to create the table when the module is loaded
createBookingsTable();

// CRUD operations for bookings (same as before)

const getBookings = async () => {
  try {
    const result = await pool.query('SELECT * FROM bookings');
    return result.rows;
  } catch (err) {
    throw new Error('Error fetching bookings: ' + err.message);
  }
};

const getBookingById = async (id) => {
  try {
    const result = await pool.query('SELECT * FROM bookings WHERE booking_id = $1', [id]);
    if (result.rows.length === 0) {
      throw new Error('Booking not found');
    }
    return result.rows[0];
  } catch (err) {
    throw new Error('Error fetching booking by ID: ' + err.message);
  }
};

// Fetch bookings by worker_id
const getBookingsByWorkerId = async (workerId) => {
  try {
    // Modified query to exclude bookings with status 'accepted'
    const result = await pool.query('SELECT * FROM bookings WHERE worker_id = $1 AND status = $2', [workerId, 'Requested']);
    return result.rows;
  } catch (err) {
    throw new Error('Error fetching bookings for worker: ' + err.message);
  }
};

const getBookingsByWorkerIdAccepted = async (workerId) => {
  try {
    // Modified query to exclude bookings with status 'accepted'
    const result = await pool.query('SELECT * FROM bookings WHERE worker_id = $1 AND status = $2', [workerId, 'accepted']);
    return result.rows;
  } catch (err) {
    throw new Error('Error fetching bookings for worker: ' + err.message);
  }
};


// code to send email 
const nodemailer = require("nodemailer");

const sendEmail = async (workerEmail, bookingDetails) => {
  try {
    // const transporter = nodemailer.createTransport({
    //   host: "smtp.ppsu.ac.in", // Replace with your email provider's SMTP host
    //   port: 587, // Use the port your provider supports (usually 587 for TLS)
    //   secure: false, // Use true for 465, false for other ports
    //   auth: {
    //     user: "21se02cs065@ppsu.ac.in",
    //     pass: "Zaid@065", // Use environment variables for sensitive data
    //   },
    // });
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: "immanuel.turner95@ethereal.email", // Generated Ethereal account
        pass: "WV4wuD8Y1UJ5ae4XGF", // Generated Ethereal password
      },
    });
    

    const mailOptions = {
      from: "elias56@ethereal.email",
      to: workerEmail,
      subject: "New Booking Notification",
      html: `
        <h3>You have a new booking!</h3>
        <p><strong>Location:</strong> ${bookingDetails.city}, ${bookingDetails.address}, ${bookingDetails.pin_code}</p>
        <p><strong>Date:</strong> ${bookingDetails.booking_date}</p>
        <p><strong>Task Size:</strong> ${bookingDetails.task_size}</p>
        <p><strong>Details:</strong> ${bookingDetails.task_details}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Failed to send email:", error.message);
  }
};




const createBooking = async (userId, workerId, serviceName, bookingDate, status, city, address, pinCode, taskSize, taskDetails) => {
  try {
    console.log("This is model form data", userId, workerId, serviceName, bookingDate, status, city, address, pinCode, taskSize, taskDetails);

    const result = await pool.query(
      'INSERT INTO bookings (user_id, worker_id, service_name, booking_date, status, city, address, pin_code, task_size, task_details) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
      [userId, workerId, serviceName, bookingDate, status, city, address, pinCode, taskSize, taskDetails]
    );

    const booking = result.rows[0];
    const workerEmail = "21se02cs065@ppsu.ac.in";

    if (workerEmail) {
      await sendEmail(workerEmail, booking);
    }

    return booking;
  } catch (err) {
    throw new Error('Error creating booking: ' + err.message);
  }
};

const updateBooking = async (id, status) => {
  try {
    const result = await pool.query(
      'UPDATE bookings SET status = $1 WHERE booking_id = $2 RETURNING *',
      [status, id]
    );
    if (result.rows.length === 0) {
      throw new Error('Booking not found');
    }
    return result.rows[0];
  } catch (err) {
    throw new Error('Error updating booking: ' + err.message);
  }
};

const deleteBooking = async (id) => {
  try {
    const result = await pool.query('DELETE FROM bookings WHERE booking_id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      throw new Error('Booking not found');
    }
    return result.rows[0];
  } catch (err) {
    throw new Error('Error deleting booking: ' + err.message);
  }
};

module.exports = {
  createBookingsTable,
  getBookings,
  getBookingById,
  getBookingsByWorkerId,
  getBookingsByWorkerIdAccepted,
  createBooking,
  updateBooking,
  deleteBooking,
};
