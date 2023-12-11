const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;
require("./transportExtras");

const transportBaseSchema = new mongoose.Schema({
  type: String, // ex: "train", "flight", ...
  travelCompany: String, // ex: "SNCF", ...
  possibleExtras: [{ type: ObjectId, ref: "transport_extras" }],
});

const TransportBase = mongoose.model("transport_bases", transportBaseSchema);

module.exports = TransportBase;
