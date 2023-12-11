const mongoose = require("mongoose");
const { locationSchema } = require("../commonSchemas");
const ObjectId = mongoose.Schema.Types.ObjectId;
require("./accommodationExtras");

const accommodationBaseSchema = new mongoose.Schema({
  type: String, // ex: "hotel", "airbnb", ...
  name: String,
  description: String,
  location: locationSchema,
  address: String,
  contactInfo: {
    name: String,
    email: String,
  },
  isBreakfastIncluded: Boolean,
  possibleExtras: [{ type: ObjectId, ref: "accommodation_extras" }],
});

const AccommodationBase = mongoose.model(
  "accommodation_bases",
  accommodationBaseSchema
);

module.exports = AccommodationBase;
