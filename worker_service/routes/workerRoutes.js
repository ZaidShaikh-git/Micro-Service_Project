const express = require('express');
const router = express.Router();
const workerController = require('../controllers/workerController');

// Routes for workers
router.get('/', workerController.getWorkers); // Get all workers
router.get('/:skill', workerController.getWorkersBySkill);
router.get('/byId/:id', workerController.getWorkerById); // Get worker by ID
router.post('/', workerController.createWorker); // Create a new worker
router.put('/:id', workerController.updateWorker); // Update worker details
router.delete('/:id', workerController.deleteWorker); // Delete a worker

module.exports = router;
