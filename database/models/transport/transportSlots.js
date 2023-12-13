const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;
require("./transportBases");
require("../destinations");

const transportSlotSchema = new mongoose.Schema({
  transportBase: { type: ObjectId, ref: "transport_bases" },
  departure: {
    place: { type: ObjectId, ref: "destinations" },
    date: Date,
  },
  arrival: {
    place: { type: ObjectId, ref: "destinations" },
    date: Date,
  },
  firstClass: {
    price: Number,
    maxNbSeats: Number,
    //availableSeats: [String], // ex: ["23E", "18C", ...]
    nextAvailableSeat: String,   //ex: "23E"
  },
  secondClass: {
    price: Number,
    maxNbSeats: Number,
    //availableSeats: [String], // ex: ["53F", "58D", ...]
    nextAvailableSeat: String,   //ex: "95D"
  },
});

const TransportSlot = mongoose.model("transport_slots", transportSlotSchema);

module.exports = TransportSlot;
