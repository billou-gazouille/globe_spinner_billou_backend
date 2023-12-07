const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const tripSchema = new mongoose.Schema({
    user: {type: ObjectId, ref: 'users'},
    destination: String,
    outboundJourney: {  // l'aller
        transportBase: {type: ObjectId, ref: 'transportBases'},
        transportSlot: {type: ObjectId, ref: 'transportSlots'},
        transportExtras: [{type: ObjectId, ref: 'transportExtras'}],
        seatNb: String,     // ex: "14E"
        class: String,      // ex: "second"
    },
    inboundJourney: {   // le retour
        transportBase: {type: ObjectId, ref: 'transportBases'},
        transportSlot: {type: ObjectId, ref: 'transportSlots'}, 
        transportExtras: [{type: ObjectId, ref: 'transportExtras'}],
        seatNb: String,     // ex: "14E"
        class: String,      // ex: "second"
    },
    accommodation: {
        accommodationBase: {type: ObjectId, ref: 'accommodationBases'},
        accommodationSlot: {type: ObjectId, ref: 'accommodationSlots'},
        accommodationExtras: [{type: ObjectId, ref: 'accommodationExtras'}],
    },
    activities: [{
        activityBase: {type: ObjectId, ref: 'activityBases'},
        activitySlot: {type: ObjectId, ref: 'activitySlots'},
        activityExtras: [{type: ObjectId, ref: 'activityExtras'}],
    }],
    totalPaidAmount: Number,
});

const Trip = mongoose.model('trips', tripSchema);

module.exports = Trip;