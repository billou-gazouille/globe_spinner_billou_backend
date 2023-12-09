const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const journeySchema = new mongoose.Schema({
    transportSlot: {type: ObjectId, ref: 'transportSlots'},
    transportExtras: [{type: ObjectId, ref: 'transportExtras'}],
    seatNb: String,     // ex: "14E"
    class: String,      // ex: "second"
});

const tripSchema = new mongoose.Schema({
    user: {type: ObjectId, ref: 'users'},
    nbOfTravelers: Number,
    destination: String,
    outboundJourney: journeySchema, // l'aller
    inboundJourney: journeySchema,  // le retour
    accommodation: {
        accommodationSlot: {type: ObjectId, ref: 'accommodationSlots'},
        accommodationExtras: [{type: ObjectId, ref: 'accommodationExtras'}],
    },
    activities: [{
        activitySlot: {type: ObjectId, ref: 'activitySlots'},
        activityExtras: [{type: ObjectId, ref: 'activityExtras'}],
    }],
    totalPaidAmount: Number,
});

const Trip = mongoose.model('trips', tripSchema);

module.exports = Trip;