require("./database/connection");
const moment = require("moment");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const TransportBase = require("./database/models/transport/transportBases");
const TransportSlot = require("./database/models/transport/transportSlots");

const Destination = require("./database/models/destinations");

TransportSlot.find({
  "departure.place": "657833385d1d367f59d458f2",
  "arrival.place": "657833385d1d367f59d458b7",
}).then((slots) => console.log(slots.length));

// Ce script permet de chercher le nombre de trajet pour un depature.place
// et une destination.place
