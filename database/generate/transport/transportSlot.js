require('dotenv').config();
require('./../../../database/connection');

const TransportSlot = require('./../../models/transport/transportSlots');
const TransportBase = require('./../../models/transport/transportBases');


const generateTransportSlot = async () => {
    const transportBases = await TransportBase.find();
    const obj = {
        transportBase: transportBases[0],
        departure: {
            location: 'Lyon',
            date: new Date('2024-02-17T15:30')
        },
        arrival: {
            location: 'Paris',
            date: new Date('2024-02-17T16:50')
        },
        firstClass: {  
            price: 110,
            maxNbSeats: 25,
            availableSeats: ["23E", "18C", '24B']
        },
        secondClass: {
            price: 70,
            maxNbSeats: 140,
            availableSeats: ["87D", "89C", '91A']
        },
    };
    return TransportSlot.create(obj);
};

const clearTransportSlot = () => {
    return TransportSlot.deleteMany();
};

module.exports = { 
    generateTransportSlot,
    clearTransportSlot,
};