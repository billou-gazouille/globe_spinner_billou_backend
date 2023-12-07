const mongoose = require('mongoose');

const activityExtraSchema = new mongoose.Schema({
    name: String,   // ex "with audio-guide"
    price: Number, // additional cost
});

const ActivityExtra = mongoose.model('activityExtras', activityExtraSchema);

module.exports = ActivityExtra;