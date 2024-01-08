const Trip = require("../database/models/trips");

const { getTrips } = require("../routes/trips");

async function saveTrip(tripIndex) {
  const selectedTripIndex = Number(tripIndex);
  const trips = getTrips();
  const tripForDB = getFormattedTripForDB(trips[selectedTripIndex]);
  const newTrip = new Trip(tripForDB);
  const savedTrip = await newTrip.save();
  return savedTrip;
}

function getFormattedTripForDB(trip) {
  const activitiesDB = trip.activities.map((act) => {
    return {
      activitySlot: act._id, // activity slot id
      activityExtras: [], // no extras for now
    };
  });

  return {
    nbOfTravelers: trip.numberOfTravelers,
    destination: trip.destination.id,
    outboundJourney: {
      transportSlot: trip.outboundJourney.id, // put transport slot id here
      transportExtras: [], // no extras for now
      seats: {
        from: trip.outboundJourney.seats.from,
        to: trip.outboundJourney.seats.to,
      }, // put seat numbers here
      class: trip.outboundJourney.class,
    },
    inboundJourney: {
      transportSlot: trip.inboundJourney.id, // put transport slot id here
      transportExtras: [], // no extras for now
      seats: {
        from: trip.inboundJourney.seats.from,
        to: trip.inboundJourney.seats.to,
      }, // put seat numbers here
      class: trip.inboundJourney.class,
    },
    accommodation: {
      accommodationRoom: trip.accommodation._id, // accommodation room id
      accommodationExtras: trip.accommodation.accommodationBase.possibleExtras,
    },
    activities: activitiesDB,
    totalPaidAmount: trip.total,
  };
}

async function getSavedTripById(tripId) {
  const savedTrip = await Trip.findById(tripId);
  return savedTrip;
}

module.exports = { saveTrip, getFormattedTripForDB };
