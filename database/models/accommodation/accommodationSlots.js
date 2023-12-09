const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const accommodationSlotSchema = new mongoose.Schema({
    accommodationBase: {type: ObjectId, ref: 'accommodationBases'},
    roomNb: Number,
    from: Date,
    to: Date,
    maxNbPeople: Number,
    pricePerNight: Number,
    isTaken: Boolean,   // has this room already been booked by someone ?
});

const AccommodationSlot = mongoose.model('accommodationSlots', accommodationSlotSchema);

module.exports = AccommodationSlot;