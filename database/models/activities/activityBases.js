const mongoose = require('mongoose');
const { locationSchema } = require('../commonSchemas');

const activityBaseSchema = new mongoose.Schema({
    name: String,
    organisationName: String,   // ex: "surf-in-Nice"
    description: String,
    location: locationSchema,
});

const ActivityBase = mongoose.model('activityBases', activityBaseSchema);

module.exports = ActivityBase;