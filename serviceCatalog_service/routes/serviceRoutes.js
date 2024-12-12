const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');

// Routes for service CRUD operations
router.get('/', serviceController.getServices);               // Get all services
router.get('/:id', serviceController.getServiceById);         // Get service by ID
router.post('/', serviceController.createService);            // Create a new service
router.put('/:id', serviceController.updateService);          // Update a service by ID
router.delete('/:id', serviceController.deleteService);       // Delete a service by ID

module.exports = router;
