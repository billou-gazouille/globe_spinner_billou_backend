require('dotenv').config();
require('./../../../database/connection');

const TransportBase = require('./../../models/transport/transportBases');
const TransportExtra = require('./../../models/transport/transportExtras');

function getRandomSubset(arr, maxLength) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    const length = getRandomIndex(maxLength);
    return arr.slice(0, length);
}

function getRandomIndex(maxIndex){
    return Math.floor(Math.random() * maxIndex);
}

transportTypes = ['Coach', 'Train', 'Airplane'];

function getRandomTransportType(){
    return transportTypes[Math.floor(Math.random() * transportTypes.length)];
}

const generateTransportBase = async () => {
    const transportExtras = await TransportExtra.find();
    const type = getRandomTransportType();
    const obj = {
        type: type,
        travelCompany: `some ${type} travelling company`,
        possibleExtras: getRandomSubset(transportExtras, 4),
    };
    return TransportBase.create(obj);
};

const clearTransportBases = () => {
    return TransportBase.deleteMany();
};

module.exports = { 
    generateTransportBase,
    clearTransportBases,
};