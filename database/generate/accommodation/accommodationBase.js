require('dotenv').config();
require('../../connection');

const AccommodationBase = require('../../models/accommodation/accommodationBases');
const AccommodationExtra = require('../../models/accommodation/accommodationExtras');


const generateAccommodationBase = async () => {
    const accommodationExtras = await AccommodationExtra.find();
    const randomIndex = Math.floor(Math.random() * accommodationExtras.length);
    const randomExtra = accommodationExtras[randomIndex]._id;
    const randomIndex2 = Math.floor(Math.random() * accommodationExtras.length);
    const randomExtra2 = accommodationExtras[randomIndex2]._id;
    
    const obj = {
        type: 'hotel',   // ex: "hotel", "airbnb", ...
        name: 'the grand palace',
        description: 'hotel by the side of the beach',
        location: { latitude: 51.05, longitude: 27.23 },
        address: '56, Downtown Road, 51-044',
        contactInfo: {    
            name: 'John Doe',  
            email: 'john.doe@example.com',
        },
        isBreakfastIncluded: true,
        possibleExtras: [randomExtra, randomExtra2],
    }
    return AccommodationBase.create(obj);
};

const clearAccommodationBases = () => {
    return AccommodationBase.deleteMany();
};

module.exports = { 
    generateAccommodationBase,
    clearAccommodationBases,
};