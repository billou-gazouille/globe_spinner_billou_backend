require('dotenv').config();
require('../../connection');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const ActivityBase = require('../../models/activities/activityBases');
const Destination = require('../../models/destinations');


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

const maxLatitudeDeviation = 0.1;   // environ 11 km
const maxLongitudeDeviation = 0.1;   // environ 11 km


Promise.all([
    ActivityBase.find(),
    Destination.find(),
])
.then(([bases, destinations]) => {
    // console.log(bases.length);
    // console.log(destinations.length);
    bases.forEach(base => {
        const randomLocIndex = getRandomIndex(destinations.length-1);
        const randomDest = destinations[randomLocIndex];
        const { latitude, longitude } = randomDest.centerLocation;
        const latitudeDeviation =  (Math.random()-0.5) * 2 * maxLatitudeDeviation;
        const longitudeDeviation =  (Math.random()-0.5) * 2 * maxLongitudeDeviation;
        //console.log(latitude, longitude);
        //console.log(latitude+latitudeDeviation, longitude+longitudeDeviation);
        base.location = { 
            latitude: latitude+latitudeDeviation, 
            longitude: longitude+longitudeDeviation 
        };
        base.save();
    });
});