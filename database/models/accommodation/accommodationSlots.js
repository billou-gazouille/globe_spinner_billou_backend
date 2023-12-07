const mongoose = require('mongoose');

const accommodationSlotSchema = new mongoose.Schema({
    roomNb: Number,
    from: Date,
    to: Date,
    maxNbPeople: Number,
    pricePerNight: Number,
});

const AccommodationSlot = mongoose.model('accommodationSlots', accommodationSlotSchema);

module.exports = AccommodationSlot;