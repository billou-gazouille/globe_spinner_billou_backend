const mongoose = require('mongoose');
const { locationSchema } = require('../commonSchemas');
const ObjectId = mongoose.Schema.Types.ObjectId;

const activityBaseSchema = new mongoose.Schema({
    name: String,
    organisationName: String,   // ex: "surf-in-Nice"
    description: String,
    location: locationSchema,
    activityTags: [String],
    possibleExtras: [{type: ObjectId, ref: 'activityExtras'}],
});

const ActivityBase = mongoose.model('activityBases', activityBaseSchema);

module.exports = ActivityBase;