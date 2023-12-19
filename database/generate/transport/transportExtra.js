require('dotenv').config();
require('./../../../database/connection');

const TransportExtra = require('./../../models/transport/transportExtras');


const generateTransportExtra = async () => {
    const obj = {
        name: 'luggage > 25kg',
        price: 40,
    };
    return TransportExtra.create(obj);
};

const clearTransportExtras = () => {
    return TransportExtra.deleteMany();
};

module.exports = { 
    generateTransportExtra,
    clearTransportExtras,
};