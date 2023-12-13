var express = require("express");
var router = express.Router();
// const { saveTrip } = require("./savedtrips");

const Trip = require("../database/models/trips");
const AccommodationRooms = require("../database/models/accommodation/accommodationRooms");
const Destination = require("../database/models/destinations");
const { tripA, tripB } = require("../exampleTrips");
let trips = [tripA, tripB];

// ROUTE GET POUR REGENERER ACCOMMODATION
router.get(
  "/newAccommodation/:Locationeparture/:depDate/:arrivDate/:duration/:budget/:people",
  async (req, res) => {
    const { LocationDeparture, depDate, arrivDate, duration, budget, people } =
      req.params;

    const newAccommodation = await findAccommodation(
      LocationDeparture,
      depDate,
      arrivDate,
      duration,
      budget,
      people
    );

    if (!newAccommodation) {
      return res.status(404).json({
        message: "Aucun nouvel hébergement trouvé pour le filtre specifié!",
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

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers

  return distance.toFixed(2);
};

//
router.post("/generate", async (req, res) => {
  const filters = req.body;
  //Cette première section permet de donner le lieu de départ (aéroport, gare, etc.) le plus proche de
  //l'adresse de l'utilisateur renseignée + de générer aléatoirement un lieu d'arrivée.
  const data = await Destination.find();

  const locations = data.map((e) => {
    return {
      name: e.name,
      lat: e.centerLocation.latitude,
      lon: e.centerLocation.longitude,
      distance: calculateDistance(
        e.centerLocation.latitude,
        e.centerLocation.longitude,
        filters.latitude,
        filters.longitude
      ),
    };
  });
  const sortedlocations = locations.sort((a, b) => {
    return a.distance - b.distance;
  });
  const destinationIndex =
    Math.floor(Math.random() * sortedlocations.length) + 1;
  const destination = sortedlocations[destinationIndex];
  const departureLocation = sortedlocations[0];
  // fin de la première section

  // cette deuxième section doit permettre de trouver un trajet parmi la liste des destinations
  //qui a été générée puis de les filtrer par budget/temps de trajet

  return;
});

(module.exports = router), { tripA, tripB };
