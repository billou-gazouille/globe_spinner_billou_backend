require('dotenv').config();
require('./../../../database/connection');

const ActivityExtra = require('./../../models/activities/activityExtras');

const generateActivityExtra = () => {
    const obj = {
        name: 'example',
        price: 50,
    };
    return ActivityExtra.create(obj);
};

const clearActivityExtras = () => {
    return ActivityExtra.deleteMany();
};

module.exports = { 
    generateActivityExtra,
    clearActivityExtras,
};