const express = require('express');

const router = express.Router();

const supplierController = require('../controllers/supplier.controller.js');


router.post('/createSupplier', supplierController.createSupplier);
router.get('/getAllSuppliers', supplierController.getAllSuppliers);
router.get('/getSupplierById/:id', supplierController.getSupplierById);
router.delete('deleteSupplier/:id', supplierController.deleteSupplier);
router.put('/updateSupplier/:id', supplierController.updateSupplier);



module.exports = router;
