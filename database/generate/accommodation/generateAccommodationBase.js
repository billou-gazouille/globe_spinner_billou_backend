require('dotenv').config();
require('./../../../database/connection');
const mongoose = require('mongoose');
const AccommodationBase = require('./../../models/accommodation/accommodationBases');

module.exports = () => {
    console.log(mongoose.connection.models);
};