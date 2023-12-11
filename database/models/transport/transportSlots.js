const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;
require("./transportBases");

const transportSlotSchema = new mongoose.Schema({
  transportBase: { type: ObjectId, ref: "transport_bases" },
  departure: {
    location: String,
    date: Date,
  },
  arrival: {
    location: String,
    date: Date,
  },
  firstClass: {
    price: Number,
    maxNbSeats: Number,
    availableSeats: [String], // ex: ["23E", "18C", ...]
  },
  secondClass: {
    price: Number,
    maxNbSeats: Number,
    availableSeats: [String], // ex: ["53F", "58D", ...]
  },
});

const TransportSlot = mongoose.model("transport_slots", transportSlotSchema);

module.exports = TransportSlot;
