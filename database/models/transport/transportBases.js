const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const transportBaseSchema = new mongoose.Schema({
    type: String,   // ex: "train", "flight", ...
    travelCompany: String,  // ex: "SNCF", ... 
    possibleExtras: [{type: ObjectId, ref: 'transportExtras'}],
});

const TransportBase = mongoose.model('transportBases', transportBaseSchema);

module.exports = TransportBase;