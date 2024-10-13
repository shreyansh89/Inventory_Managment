const Inventory = require('../models/inventory');
const csvHelper = require('../utils/csvHelper');
const path = require('path');

// Path for temporary CSV file storage
const CSV_FILE_PATH = path.join(__dirname, '../temp/inventory.csv');

// Create inventory 
exports.createInventoryItem = async (req, res) => {
  try {
    const newItem = new Inventory(req.body);
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } 
  catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all inventory items
exports.getAllInventoryItems = async (req, res) => {
  try {
    const items = await Inventory.find().populate('supplier_id');
    res.status(200).json(items);
  } 
  catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// single inventory item 
exports.getInventoryItemById = async (req, res) => {
  try {
    const item = await Inventory.findById(req.params.id).populate('supplier_id');
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.status(200).json(item);
  } 
  catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Delete 
exports.deleteInventoryItem = async (req, res) => {
  try {
    await Inventory.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Item deleted successfully' });
  } 
  catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update 
exports.updateInventoryItem = async (req, res) => {
  try {
    const updatedItem = await Inventory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedItem);
  } 
  catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Export inventory to CSV
exports.exportInventoryToCSV = async (req, res) => {
    try {
      const items = await Inventory.find().populate('supplier_id');
      const formattedItems = items.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        supplier_name: item.supplier_id ? item.supplier_id.name : 'No Supplier'
      }));
  
      // Export to CSV and store the file temporarily
      csvHelper.exportToCSV(formattedItems, CSV_FILE_PATH);
      
      // Send the file to the client
      res.download(CSV_FILE_PATH, 'inventory.csv', (err) => {
        if (err) {
          console.error('File download error:', err);
        }
      });
    }
    catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Import inventory from CSV
  exports.importInventoryFromCSV = async (req, res) => {
    try {
      const filePath = req.file.path;
      const items = await csvHelper.importFromCSV(filePath);
  
      for (const item of items) {
        await Inventory.updateOne(
          { name: item.name }, 
          {
            $set: {
              quantity: item.quantity,
              price: item.price,
              // using supplier name from the CSV
            }
          },
          { upsert: true } // Create new item if it doesn't exist
        );
      }
  
      res.status(200).json({ message: 'Inventory updated successfully from CSV' });
    } 
    catch (error) {
      res.status(500).json({ message: error.message });
    }
  };