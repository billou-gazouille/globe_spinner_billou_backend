const mongoose = require('mongoose');

const activitySlotSchema = new mongoose.Schema({
    startTime: Date,
    endTime: Date,
    maxNbPeople: Number,
});

const ActivitySlot = mongoose.model('activitySlots', activitySlotSchema);

module.exports = ActivitySlot;