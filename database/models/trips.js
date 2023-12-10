const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const journeySchema = new mongoose.Schema({
    transportSlot: {type: ObjectId, ref: 'transport_slots'},
    transportExtras: [{type: ObjectId, ref: 'transport_extras'}],
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
        accommodationSlot: {type: ObjectId, ref: 'accommodation_slots'},
        accommodationExtras: [{type: ObjectId, ref: 'accommodation_extras'}],
    },
    activities: [{
        activitySlot: {type: ObjectId, ref: 'activity_slots'},
        activityExtras: [{type: ObjectId, ref: 'activity_extras'}],
    }],
    totalPaidAmount: Number,
});

const Trip = mongoose.model('trips', tripSchema);

module.exports = Trip;