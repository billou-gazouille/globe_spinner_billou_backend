const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    token: String,
    savedTrips: [{type: ObjectId, ref: 'trips'}],
    reservedTrips: [{type: ObjectId, ref: 'trips'}],
    bankCard: {
        cardNumber: String,   
        expiryDate: Date,
        code: String,
    },
});

const User = mongoose.model('users', userSchema);

module.exports = User;