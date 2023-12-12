const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;
require("./trips");

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  token: String,
  savedTrips: [{ type: ObjectId, ref: "trips" }],
  reservedTrips: [{ type: ObjectId, ref: "trips" }],
  bankCardInfo: {
    nameOnCard: String,
    cardNumber: String,
    expiryDate: Date,
    ccv: String,
  },
});

const User = mongoose.model("users", userSchema);

module.exports = User;
