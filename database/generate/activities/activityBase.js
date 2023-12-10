require('dotenv').config();
require('./../../../database/connection');

const ActivityBase = require('./../../models/activities/activityBases');
const ActivityExtra = require('./../../models/activities/activityExtras');


const generateActivityBase = async () => {
    const activityExtras = await ActivityExtra.find();
    const randomIndex = Math.floor(Math.random() * activityExtras.length);
    const randomExtra = activityExtras[randomIndex]._id;
    const randomIndex2 = Math.floor(Math.random() * activityExtras.length);
    const randomExtra2 = activityExtras[randomIndex2]._id;
    
    const obj = {
        name: 'Water-polo',
        organisationName: 'In water-polo we trust',   // ex: "surf-in-Nice"
        description: 'lmao',
        location: { latitude: 10, longitude: 20 },
        activityTags: ['water', 'sport', 'swimming', 'competitive'],
        possibleExtras: [randomExtra, randomExtra2],
    }
    return ActivityBase.create(obj);
};

const clearActivityBases = () => {
    return ActivityBase.deleteMany();
};

module.exports = { 
    generateActivityBase,
    clearActivityBases,
};