var express = require("express");
var router = express.Router();
const { saveTrip } = require("./savedtrips");

const AccommodationBase = require('../models/accommodationBases');
const AccommodationRoom = require('../models/accommodationRooms');


const { tripA, tripB } = require("../exampleTrips");
let trips = [tripA, tripB];



async function findAccommodation(location, depDate, arrivDate, duration, people) {

    try {
      const numberOfNights = calculateNumberOfNights(depDate, arrivDate);

      const savedTrip = findSavedTrip(trips, location, depDate, arrivDate, duration,  people);
  
      if (!savedTrip) {
        return null; 
      }
  
      const accommodationToChange = savedTrip.accommodationRoom; 

      const newAccommodationBase = await generateAccommodationBase();
  
      const newAccommodationRoom = await findSuitableAccommodationRoom(newAccommodationBase, numberOfNights);
  
      if (!newAccommodationSlot) {
        return null;
      }
  
      savedTrip.accommodationRoom = newAccommodationRoom;

      updateSavedTrip(trips, savedTrip);
  
      return savedTrip;
    } catch (error) {
      console.error(error);
      throw error; 
    }
  }

router.get("/newAccommodation/:LocationDeparture/:depDate/:arrivDate/:duration/:budget/:people",
  async (req, res) => {
    const { LocationDeparture, depDate, arrivDate, duration, budget, people } =
      req.params;

    const newAccommodation = await findAccommodation(
      LocationDeparture,
      depDate,
      arrivDate,
      duration,
      people
    );

    if (!newAccommodation) {
      return res
        .status(404)
        .json({
          message:
            "Aucun nouvel hébergement trouvé pour le filtre specifié!",
          });
        }
        const findAccommodations = async (maxPrice) => {
          try {
            const accommodations = await AccommodationSlot.findOne({
              pricePerNight: { $lte: maxPrice },
            }); 
        
            return accommodations;
          }
        };
      });







      
/*
// Get /newTransport

router.get("/newTransport", async (req, res) => {});

//
router.get("/generate", async (req, res) => {
  // c'est ici qu'on creer tripA et tripB
});

module.exports = router;
module.exports = { tripA, tripB };

router.get("/newAccomodation", (req, res) => {});

module.exports = router;

*/


