const mongoose = require('mongoose');

const supplierSchema = mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  contact_info: { 
    type: String 
  },
  address: { 
    type: String 
  },
  created_at: { 
    type: Date, 
    default: Date.now() 
  },
  updated_at: { 
    type: Date, 
    default: Date.now() 
  }
});


const Supplier = mongoose.model('Supplier', supplierSchema);
module.exports = Supplier;