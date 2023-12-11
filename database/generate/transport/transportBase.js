require('dotenv').config();
require('./../../../database/connection');

const TransportBase = require('./../../models/transport/transportBases');
const TransportExtra = require('./../../models/transport/transportExtras');


const generateTransportBase = async () => {
    const transportExtras = await TransportExtra.find();
    const obj = {
        type: 'train',
        travelCompany: 'SNCF',
        possibleExtras: [transportExtras[0], transportExtras[1]],
    };
    return TransportBase.create(obj);
};

const clearTransportBase = () => {
    return TransportBase.deleteMany();
};

module.exports = { 
    generateTransportBase,
    clearTransportBase,
};