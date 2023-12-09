const mongoose = require('mongoose');
const { locationSchema } = require('./commonSchemas');

const destinationSchema = new mongoose.Schema({
    name: String,
    country: String,
    centerLocation: locationSchema,
    squareKilometers: Number,
});

const Destination = mongoose.model('destinations', destinationSchema);

module.exports = Destination;