const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const activitySlotSchema = new mongoose.Schema({
    activityBase: {type: ObjectId, ref: 'activityBases'},
    startTime: Date,
    endTime: Date,
    maxNbPeople: Number,
    remainingPlaces: Number,
    price: Number,
});

const ActivitySlot = mongoose.model('activitySlots', activitySlotSchema);

module.exports = ActivitySlot;