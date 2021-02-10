const mongoose = require('mongoose');

/**
 * Address Schema
 */
const AddressSchema = new mongoose.Schema({
    street: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zip: {
        type: String,
        required: true
    }
});

const Address = mongoose.model('Address', AddressSchema);

// module.exports = Address;