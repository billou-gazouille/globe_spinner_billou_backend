const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const transportAvailabilitySchema = new mongoose.Schema({
    transportBase: {type: ObjectId, ref: 'transportBases'},
    transportSlot: {type: ObjectId, ref: 'transportSlots'},
    availableFirstClassSeats: [Number], // ex: [14, 16, 18, ...]
    availableSecondClassSeats: [Number], // ex: [56, 58, 66, ...]
});

const TransportAvailability = mongoose.model('transportAvailabilities', transportAvailabilitySchema);

module.exports = TransportAvailability;