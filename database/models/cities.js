const mongoose = require('mongoose');
const { locationSchema } = require('../commonSchemas');

const citySchema = new mongoose.Schema({
    name: String,
    country: String,
    centerLocation: locationSchema,
    squareKilometers: Number,
});

const City = mongoose.model('cities', citySchema);

module.exports = City;