const serviceModel = require('../models/serviceModel');

// Get all services
const getServices = async (req, res) => {
  try {
    const services = await serviceModel.getServices();
    res.status(200).json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get service by ID
const getServiceById = async (req, res) => {
  try {
    const service = await serviceModel.getServiceById(req.params.id);
    res.status(200).json(service);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new service
const createService = async (req, res) => {
  try {
    const { name, description, category } = req.body;

    // Validate input as needed

    const newService = await serviceModel.createService(name, description, category);
    res.status(201).json(newService);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a service
const updateService = async (req, res) => {
  try {
    const { name, description, category } = req.body;
    const updatedService = await serviceModel.updateService(req.params.id, name, description, category);
    res.status(200).json(updatedService);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a service
const deleteService = async (req, res) => {
  try {
    await serviceModel.deleteService(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
};
