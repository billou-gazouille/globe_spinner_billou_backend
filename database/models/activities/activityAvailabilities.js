const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const activityAvailabilitySchema = new mongoose.Schema({
    activityBase: {type: ObjectId, ref: 'activityBases'},
    availabilities: [{
        activitySlot: {type: ObjectId, ref: 'activitySlots'},
        remainingPlaces: Number,
    }],
});

const ActivityAvailability = mongoose.model('activityAvailabilities', activityAvailabilitySchema);

module.exports = ActivityAvailability;