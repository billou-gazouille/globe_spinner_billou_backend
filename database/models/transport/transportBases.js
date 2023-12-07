const mongoose = require('mongoose');

const transportBaseSchema = new mongoose.Schema({
    type: String,   // ex: "train", "flight", ...
    travelCompany: String,  // ex: "SNCF", ... 
});

const TransportBase = mongoose.model('transportBases', transportBaseSchema);

module.exports = TransportBase;