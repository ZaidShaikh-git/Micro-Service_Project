const axios = require('axios');
const workerModel = require('../models/workerModel');

// Get all workers
const getWorkers = async (req, res) => {
  try {
    const workers = await workerModel.getWorkers();
    res.status(200).json(workers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get worker by ID
const getWorkerById = async (req, res) => {
  try {

    const worker = await workerModel.getWorkerById(req.params.id);
    if (worker) {
      res.status(200).send(worker);
    } else {
      res.status(404).json({ message: 'Worker not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const getWorkersBySkill = async (req, res) => {
  try {
    const worker = await workerModel.getWorkerBySkill(req.params.skill);
    if (worker) {
      res.status(200).send(worker);
    } else {
      res.status(404).json({ message: 'Worker not found with this skill' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new worker
const createWorker = async (req, res) => {
  try {
    const { name, skill, bio, rating, verified, price } = req.body;

    // Validate name
    if (!name) {
      return res.status(400).json({ message: 'Invalid contact information provided' });
    }

    // Convert `verified` to boolean
    const isVerified = verified === 'true' || verified === true;

    // Create a new worker
    const newWorker = await workerModel.createWorker(name, skill, bio, parseFloat(rating), isVerified, parseFloat(price));
    res.status(201).json(newWorker);
  } catch (err) {
    console.error('Error creating worker:', err);
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
};

// Update a worker
const updateWorker = async (req, res) => {
  try {
    const { name, skill, rating, verified, bio, price } = req.body;  // Include price
    const updatedWorker = await workerModel.updateWorker(req.params.id, name, skill, rating, verified, bio, price);  // Include price
    if (updatedWorker) {
      res.status(200).json(updatedWorker);
    } else {
      res.status(404).json({ message: 'Worker not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// Delete a worker
const deleteWorker = async (req, res) => {
  try {
    await workerModel.deleteWorker(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getWorkers,
  getWorkersBySkill,
  getWorkerById,
  createWorker,
  updateWorker,
  deleteWorker,
};
