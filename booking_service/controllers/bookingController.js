const axios = require('axios'); // Add axios for making API calls
const bookingModel = require('../models/bookingModel');

// Get all bookings
const getBookings = async (req, res) => {
  try {
    const bookings = await bookingModel.getBookings();
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get booking by ID
const getBookingById = async (req, res) => {
  try {
    const booking = await bookingModel.getBookingById(req.params.id);
    res.status(200).json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get bookings by worker_id
const getBookingsByWorkerId = async (req, res) => {
  const { workerId } = req.params;
  
  try {
    console.log("In get bookings with worker id:",workerId);
    const bookings = await bookingModel.getBookingsByWorkerId(workerId);
    if (bookings.length === 0) {
      return res.status(404).json({ message: 'No bookings found for this worker' });
    }
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getBookingsByWorkerIdAccepted = async (req, res) => {
  const { workerId } = req.params;
  
  try {
    console.log("In get bookings with worker id accepted:",workerId);
    const bookings = await bookingModel.getBookingsByWorkerIdAccepted(workerId);
    if (bookings.length === 0) {
      return res.status(404).json({ message: 'No bookings found for this worker' });
    }
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Create a new booking (Updated with API calls to User, Worker, and Service Services)
// const createBooking = async (req, res) => {
//   try {
//     const { userId, workerId, serviceName, bookingDate, status  } = req.body;

//     // // Fetch user_id from User Service
//     // const userServiceUrl = `${process.env.USER_SERVICE_URL}/users/${userId}`;
//     // const userResponse = await axios.get(userServiceUrl);
//     // if (!userResponse || userResponse.status !== 200) {
//     //   return res.status(404).json({ message: 'User not found in User Service' });
//     // }

//     // // Fetch worker_id from Worker Service
//     // const workerServiceUrl = `${process.env.WORKER_SERVICE_URL}/${workerId}`;
//     // const workerResponse = await axios.get(workerServiceUrl);
//     // if (!workerResponse || workerResponse.status !== 200) {
//     //   return res.status(404).json({ message: 'Worker not found in Worker Service' });
//     // }

//     // // Fetch service_id from Service Catalog
//     // const serviceCatalogUrl = `${process.env.SERVICE_CATALOG_URL}/${serviceId}`;
//     // const serviceResponse = await axios.get(serviceCatalogUrl);
//     // if (!serviceResponse || serviceResponse.status !== 200) {
//     //   return res.status(404).json({ message: 'Service not found in Service Catalog' });
//     // }

//     // Create the booking with validated user, worker, and service data
//     const newBooking = await bookingModel.createBooking(userId, workerId, serviceName, bookingDate, status);
//     res.status(201).json(newBooking);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// Update a booking

const createBooking = async (req, res) => {
  try {
    const { userId, workerId, serviceName, bookingDate, status, city, address, pinCode, taskSize, taskDetails } = req.body;
    console.log("The req body is:",req.body);
    const newBooking = await bookingModel.createBooking(userId, workerId, serviceName, bookingDate, status, city, address, pinCode, taskSize, taskDetails);
    res.status(201).json(newBooking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



const updateBooking = async (req, res) => {
  try {
    console.log("tje put in updating booking");
    const { status } = req.body;
    const updatedBooking = await bookingModel.updateBooking(req.params.id, status);
    res.status(200).json(updatedBooking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a booking
const deleteBooking = async (req, res) => {
  try {
    await bookingModel.deleteBooking(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getBookings,
  getBookingById,
  getBookingsByWorkerIdAccepted,
  getBookingsByWorkerId,
  createBooking,
  updateBooking,
  deleteBooking,
};
