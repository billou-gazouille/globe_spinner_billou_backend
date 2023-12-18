const findAccommodation = async (
  collection,
  numberOfTravelers,
  nbrOfNights,
  validCombination,
  destination,
  totalBudget
) => {
  const budgetByNights = totalBudget / 3 / nbrOfNights;

  const accomodations = await collection.aggregate([
    {
      $match: {
        maxNbPeople: { $gte: numberOfTravelers },
        basePricePerNight: { $lte: budgetByNights },
        bookings: {
          $not: {
            $elemMatch: {
              from: {
                $lte: validCombination.outboundJourney.arrival,
              },
              to: {
                $gte: validCombination.inboundJourney.departure,
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

  if (accomodations == 0) {
    return false;
  }
  const totalAccomodation = accomodations[0].basePricePerNight * nbrOfNights;
  return { accomodation: accomodations[0], totalAccomodation };
};

module.exports = findAccommodation;
