var express = require("express");
var router = express.Router();
const { saveTrip } = require("./savedtrips");

const Trip = require("../models/trip");
const AccommodationSlot = require("../models/accommodationSlot");

const { tripA, tripB } = require("../exampleTrips");
let trips = [tripA, tripB];


// ROUTE GET POUR REGENERER ACCOMMODATION 
router.get("/newAccommodation/:Locationeparture/:depDate/:arrivDate/:duration/:budget/:people",
  async (req, res) => {
    const { Locationeparture, depDate, arrivDate, duration, budget, people } =
      req.params;

    const newAccommodation = await findAccommodation(
      Locationeparture,
      depDate,
      arrivDate,
      duration,
      budget,
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

    const previousAccommodationPrice =
      trips[selectedTripIndex].accommodation.accommodationSlot.price;
    const newAccommodationPrice = newAccommodation.price;

    if (newAccommodationPrice <= previousAccommodationPrice) {
      trips[selectedTripIndex].accommodation = {
        accommodationSlot: newAccommodation,
        accommodationExtras: [],
      };

      const saveTripResponse = saveTrip(req);
    }
  }
);

// Get /newTransport

router.get("/newTransport", async (req, res) => {});

//
router.get("/generate", async (req, res) => {
  // c'est ici qu'on creer tripA et tripB
});

module.exports = router;
module.exports = { tripA, tripB };
