const mongoose = require('mongoose');

const accommodationExtraSchema = new mongoose.Schema({
    name: String,   // ex "with a pet"
    price: Number, // additional cost
});

const AccommodationExtra = mongoose.model('accommodation_extras', accommodationExtraSchema);

module.exports = AccommodationExtra;