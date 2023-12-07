const mongoose = require('mongoose');

const transportSlotSchema = new mongoose.Schema({
    departure: {
        location: String,
        date: Date
    },
    arrival: {
        location: String,
        date: Date
    },
    firstClass: {  
        price: Number,
        maxNbSeats: Number,
    },
    secondClass: {
        price: Number,
        maxNbSeats: Number,
    },
});

const TransportSlot = mongoose.model('transportSlots', transportSlotSchema);

module.exports = TransportSlot;