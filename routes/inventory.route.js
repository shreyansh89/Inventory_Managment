const express = require('express');

const router = express.Router();

const inventoryController = require('../controllers/inventory.controller.js');

const multer = require('multer');

// Multer setup for file upload 
const upload = multer({ dest: 'uploads/' });



router.post('/createInventoryItem', inventoryController.createInventoryItem);
router.get('/getAllInventoryItems', inventoryController.getAllInventoryItems);
router.get('/getInventoryItemById/:id', inventoryController.getInventoryItemById);
router.delete('/deleteInventoryItem/:id', inventoryController.deleteInventoryItem);
router.put('/updateInventoryItem/:id', inventoryController.updateInventoryItem);


// CSV Export Route
router.get('/export/csv', inventoryController.exportInventoryToCSV);

// CSV Import Route (using multer for file upload)
router.post('/import/csv', upload.single('file'), inventoryController.importInventoryFromCSV);


module.exports = router;
