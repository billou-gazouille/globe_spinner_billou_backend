const mongoose = require('mongoose');
const { locationSchema } = require('../commonSchemas');

const accommodationBaseSchema = new mongoose.Schema({
    type: String,   // ex: "hotel", "airbnb", ...
    name: String,
    description: String,
    location: locationSchema,
    address: String,
    contactInfo: {    
        name: String,  
        email: String,
    },
    isBreakfastIncluded: Boolean,
});

const AccommodationBase = mongoose.model('accommodationBases', accommodationBaseSchema);

module.exports = AccommodationBase;