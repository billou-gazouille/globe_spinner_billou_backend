var express = require("express");
var router = express.Router();

//const AccommodationSlot = require("../database/models/accommodationRooms");

const moment = require("moment");
const { isPointWithinRadius } = require("../modules/checkDistance");

const Trip = require("../database/models/trips");
const AccommodationRooms = require("../database/models/accommodation/accommodationRooms");
const TransportSlot = require("../database/models/transport/transportSlots");
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
  //Cherche le lieu de départ (aéroport, gare, etc.) le plus proche de l'adresse de l'utilisateur renseignée + de générer aléatoirement la destination.
  const destinations = await Destination.find();

  const locations = destinations
    .map((e) => {
      return {
        id: e._id,
        name: e.name,
        country: e.country,
        lat: e.centerLocation.latitude,
        lon: e.centerLocation.longitude,
        distance: calculateDistance(
          e.centerLocation.latitude,
          e.centerLocation.longitude,
          filters.lat,
          filters.lon
        ),
      };
    })
    .sort((a, b) => a.distance - b.distance); // trie du plus proche au plus lointain
  const destinationIndex = Math.floor(Math.random() * locations.length) + 1;
  const destination = locations[destinationIndex];
  const departureLocation = locations[0];
  // ----------- fin de la première section -----------

  // ----------- GENERATION DES ALLERS RETOURS -----------
  const numberOfTravelers = Number(filters.nbrOfTravelers);

  const findTransportSlots = async (
    departurePlace,
    arrivalPlace,
    departureDateRange,
    numberOfTravelers
  ) => {
    return await TransportSlot.aggregate([
      {
        $match: {
          "departure.place": departurePlace,
          "arrival.place": arrivalPlace,
          "departure.date": {
            $gte: departureDateRange.min,
            $lte: departureDateRange.max,
          },
        },
      },
      {
        $lookup: {
          from: "transport_bases",
          localField: "transportBase",
          foreignField: "_id",
          as: "transportBase",
        },
      },
      {
        $unwind: "$transportBase",
      },
      {
        $addFields: {
          totalAvailableSeats: {
            $sum: [
              "$firstClass.nbRemainingSeats",
              "$secondClass.nbRemainingSeats",
            ],
          },
        },
      },
      {
        $match: {
          totalAvailableSeats: { $gte: numberOfTravelers },
        },
      },
    ]);
  };

  const departureDateRangeOutbound = {
    min: moment(filters.departureMinOutbound).toDate(),
    max: moment(filters.departureMaxOutbound).toDate(),
  };

  const departureDateRangeInbound = {
    min: moment(filters.departureMinInbound).toDate(),
    max: moment(filters.departureMaxInbound).toDate(),
  };

  const outboundJourneys = await findTransportSlots(
    departureLocation.id,
    destination.id,
    departureDateRangeOutbound,
    numberOfTravelers
  );

  const inboundJourneys = await findTransportSlots(
    destination.id,
    departureLocation.id,
    departureDateRangeInbound,
    numberOfTravelers
  );

  const totalBudget = filters.budget;
  const validCombinations = [];
  const classes = ["firstClass", "secondClass"];

  for (let outboundClass of classes) {
    for (let outboundJourney of outboundJourneys) {
      const outboundPrice = outboundJourney[outboundClass].price;
      // const outboundSeats =
      //   outboundJourney.firstClass.nbRemainingSeats +
      //   outboundJourney.secondClass.nbRemainingSeats;
      for (let inboundClass of classes) {
        for (let inboundJourney of inboundJourneys) {
          const inboundPrice = inboundJourney[inboundClass].price;
          // const inboundSeats =
          //   inboundJourney.firstClass.nbRemainingSeats +
          //   inboundJourney.secondClass.nbRemainingSeats;

          const totalCost = outboundPrice + inboundPrice;

          if (totalCost <= totalBudget / 3) {
            validCombinations.push({
              outboundJourney: {
                type: outboundJourney.transportBase.type,
                class: outboundClass,
                departure: outboundJourney.departure.date,
                arrival: outboundJourney.arrival.date,
                price: outboundPrice.toFixed(2),
              },
              inboundJourney: {
                type: inboundJourney.transportBase.type,
                class: inboundClass,
                departure: inboundJourney.departure.date,
                arrival: inboundJourney.arrival.date,
                price: inboundPrice.toFixed(2),
              },
              totalCost: totalCost.toFixed(2),
            });
          }
        }
      }
    }
  }
  validCombinations.sort((a, b) => a.totalCost - b.totalCost);
  // ----------- fin allers retours -----------

  // ----------- GENERATION DU LOGEMENT -----------
  // Check location, Check availability based on transport, check nbr of people, check budget
  if (validCombinations.length == 0) {
    return res.json("no journey found");
  }

  const arrival = moment
    .utc(validCombinations[0].outboundJourney.arrival)
    .startOf("day");
  const departure = moment
    .utc(validCombinations[0].inboundJourney.departure)
    .startOf("day");

  const nbrOfNights = Math.abs(departure.diff(arrival, "days"));

  const budgetByNights = totalBudget / 3 / nbrOfNights;

  const accomodations = await AccommodationRooms.aggregate([
    {
      $match: {
        maxNbPeople: { $gte: numberOfTravelers },
        basePricePerNight: { $lte: budgetByNights },
        bookings: {
          $not: {
            $elemMatch: {
              from: {
                $lte: validCombinations[0].outboundJourney.arrival,
              },
              to: {
                $gte: validCombinations[0].inboundJourney.departure,
              },
            },
          },
        },
      },
    },
    {
      $lookup: {
        from: "accommodation_bases",
        localField: "accommodationBase",
        foreignField: "_id",
        as: "accommodationBase",
      },
    },
    {
      $unwind: "$accommodationBase",
    },
    {
      $addFields: {
        locationArray: [
          "$accommodationBase.location.longitude",
          "$accommodationBase.location.latitude",
        ],
      },
    },
    {
      $match: {
        locationArray: {
          $geoWithin: {
            $centerSphere: [[destination.lon, destination.lat], 10 / 6371],
          },
        },
      },
    },
  ]);

  if (accomodations.length == 0) {
    return res.json({ error: "no accomodations found", destination });
  }

  return res.json({
    destination,
    // nbrCombinations: validCombinations.length,
    // validCombinations,
    accomodations,
    nbr: accomodations.length,
    nbrOfNights,
  });
});

(module.exports = router), { tripA, tripB };
