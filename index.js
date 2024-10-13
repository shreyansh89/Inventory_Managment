const express = require('express');

const port = 8000;

const path = require('path');

const app = express();

// MongoDB Connection
const db = require("./config/mongoose");


// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'uploads'))); 

// Use routes
app.use('/inventory', require("./routes/inventory.route.js"));
app.use('/suppliers', require("./routes/supplier.route.js"));



// Start server
app.listen(port, ()=>{ console.log(`server running on port ${port}`); });