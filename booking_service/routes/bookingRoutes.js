// routes/bookingRoutes.js
const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

// Define routes
router.get('/', bookingController.getBookings); // Get all bookings
router.get('/:id', bookingController.getBookingById); // Get booking by ID
router.get('/worker/:workerId', bookingController.getBookingsByWorkerId); // Get bookings by worker ID
router.get('/workerAccepted/:workerId', bookingController.getBookingsByWorkerIdAccepted); // Get bookings by worker ID

router.post('/', bookingController.createBooking); // Create a new booking
router.put('/:id', bookingController.updateBooking); // Update a booking
router.delete('/:id', bookingController.deleteBooking); // Delete a booking

module.exports = router;
