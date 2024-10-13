const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1/Inventory_Managment");

const db = mongoose.connection;

db.once('open', (e)=>{
    if(e){ console.log("db not connected"); }
    console.log("db is connected");
});

module.exports = db;