require('dotenv').config();
require('../../connection');

const AccommodationSlot = require('../../models/accommodation/accommodationSlots');
const AccommodationBase = require('../../models/accommodation/accommodationBases');


const generateAccommodationSlot = async () => {
    const accommodationBases = await AccommodationBase.find();
    const randomIndex = Math.floor(Math.random() * accommodationBases.length);
    const randomBase = accommodationBases[randomIndex]._id;

    const obj = {
        accommodationBase: randomBase,
        roomNb: 78,
        from: new Date('2024-05-14T18:00'),
        to: new Date('2024-09-14T18:00'),
        maxNbPeople: 4,
        pricePerNight: 90,
        isTaken: true,
    };
    return AccommodationSlot.create(obj);
};

const clearAccommodationSlots = () => {
    return AccommodationSlot.deleteMany();
};

module.exports = { 
    generateAccommodationSlot,
    clearAccommodationSlots,
};