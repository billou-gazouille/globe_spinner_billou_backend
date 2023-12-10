require('dotenv').config();
require('./../../../database/connection');

const ActivitySlot = require('./../../models/activities/activitySlots');
const ActivityBase = require('./../../models/activities/activityBases');


const generateActivitySlot = async () => {
    const activityBases = await ActivityBase.find();
    const randomIndex = Math.floor(Math.random() * activityBases.length);
    const randomBase = activityBases[randomIndex]._id;

    const obj = {
        activityBase: randomBase,
        startTime: new Date('2024-05-15T14:00'),
        endTime: new Date('2024-05-15T17:00'),
        maxNbPeople: 8,
        remainingPlaces: 5,
        price: 45,
    };
    return ActivitySlot.create(obj);
};

const clearActivitySlots = () => {
    return ActivitySlot.deleteMany();
};

module.exports = { 
    generateActivitySlot,
    clearActivitySlots,
};