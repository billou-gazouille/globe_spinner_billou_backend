const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const accommodationAvailabilitySchema = new mongoose.Schema({
    accommodationBase: {type: ObjectId, ref: 'accommodationBases'},
    availableSlots: [{type: ObjectId, ref: 'accommodationSlots'}],
});

const AccommodationAvailability = mongoose.model('accommodationAvailabilities', accommodationAvailabilitySchema);

module.exports = AccommodationAvailability;