const mongoose = require("mongoose");
const { locationSchema } = require("../commonSchemas");
const ObjectId = mongoose.Schema.Types.ObjectId;
require("./activityExtras");

const activityBaseSchema = new mongoose.Schema({
  name: String,
  organisationName: String, // ex: "surf-in-Nice"
  description: String,
  location: locationSchema,
  activityTags: [String],
  possibleExtras: [{ type: ObjectId, ref: "activity_extras" }],
});

const ActivityBase = mongoose.model("activity_bases", activityBaseSchema);

module.exports = ActivityBase;
