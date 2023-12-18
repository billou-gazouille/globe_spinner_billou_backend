const findTransportSlots = async (
  collection,
  departurePlace,
  arrivalPlace,
  departureDateRange,
  numberOfTravelers
) => {
  return await collection.aggregate([
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

module.exports = findTransportSlots;
