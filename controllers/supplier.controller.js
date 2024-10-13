const Supplier = require('../models/supplier');

// Create supplier
exports.createSupplier = async (req, res) => {
  console.log(req.body);
  
  try {
    const newSupplier = new Supplier(req.body);
    const savedSupplier = await newSupplier.save();
    res.status(201).json(savedSupplier);
  } 
  catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all suppliers
exports.getAllSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.status(200).json(suppliers);
  } 
  catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get supplier id
exports.getSupplierById = async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) return res.status(404).json({ message: 'Supplier not found' });
    res.status(200).json(supplier);
  } 
  catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Delete supplier
exports.deleteSupplier = async (req, res) => {
  try {
    await Supplier.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Supplier deleted successfully' });
  } 
  catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Update supplier
exports.updateSupplier = async (req, res) => {
  try {
    const updatedSupplier = await Supplier.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedSupplier);
  }
  catch (error) {
    res.status(400).json({ message: error.message });
  }
};

