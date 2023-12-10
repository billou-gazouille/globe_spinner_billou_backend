require('dotenv').config();
require('../../connection');

const AccommodationExtra = require('../../models/accommodation/accommodationExtras');

const generateAccommodationExtra = () => {
    const obj = {
        name: 'example',
        price: 30,
    };
    return AccommodationExtra.create(obj);
};

const clearAccommodationExtras = () => {
    return AccommodationExtra.deleteMany();
};

module.exports = { 
    generateAccommodationExtra,
    clearAccommodationExtras,
};