const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    quantity: { 
        type: Number, 
        required: true
    },
    price: { 
        type: Number, 
        required: true 
    },
    supplier_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Supplier' 
    },
    low_stock: { 
        type: Number, 
        default: 10 
    },
    created_at: { 
        type: Date, 
        default: Date.now
    },
    updated_at: { 
        type: Date, 
        default: Date.now
    }
});


const Inventory = mongoose.model('Inventory', inventorySchema);
module.exports = Inventory;