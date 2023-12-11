const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;
require("./activityBases");

const activitySlotSchema = new mongoose.Schema({
  activityBase: { type: ObjectId, ref: "activity_bases" },
  startTime: Date,
  endTime: Date,
  maxNbPeople: Number,
  remainingPlaces: Number,
  price: Number,
});

const ActivitySlot = mongoose.model("activity_slots", activitySlotSchema);

module.exports = ActivitySlot;
