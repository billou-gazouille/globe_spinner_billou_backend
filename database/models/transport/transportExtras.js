const mongoose = require('mongoose');

const transportExtraSchema = new mongoose.Schema({
    name: String,   // ex "luggage > 25kg"
    price: Number, // additional cost
});

const TransportExtra = mongoose.model('transport_extras', transportExtraSchema);

module.exports = TransportExtra;