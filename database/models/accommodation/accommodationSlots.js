const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;
require("./accommodationBases");

const accommodationSlotSchema = new mongoose.Schema({
  accommodationBase: { type: ObjectId, ref: "accommodation_bases" },
  roomNb: Number,
  from: Date,
  to: Date,
  maxNbPeople: Number,
  pricePerNight: Number,
  isTaken: Boolean, // has this room already been booked by someone ?
});

const AccommodationSlot = mongoose.model(
  "accommodation_slots",
  accommodationSlotSchema
);

module.exports = AccommodationSlot;
