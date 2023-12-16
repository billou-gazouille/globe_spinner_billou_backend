function isPointWithinRadius(point1, point2, radius) {
  // Convert latitude and longitude from degrees to radians
  const toRadians = (angle) => (angle * Math.PI) / 180;

  // Haversine formula
  const haversine = (a, b) =>
    Math.pow(Math.sin((b - a) / 2), 2) +
    Math.cos(a) * Math.cos(b) * Math.pow(Math.sin(radius / 2), 2);

  const haversineDistance =
    haversine(toRadians(point1.lat), toRadians(point2.lat)) +
    Math.cos(toRadians(point1.lat)) *
      Math.cos(toRadians(point2.lat)) *
      haversine(toRadians(point1.lon), toRadians(point2.lon));

  // Radius of the Earth (in kilometers)
  const earthRadius = 6371;

  // Calculate the distance in kilometers
  const distance = 2 * earthRadius * Math.asin(Math.sqrt(haversineDistance));

  // Check if the distance is within the specified radius
  return distance <= radius;
}
module.exports = { isPointWithinRadius };
// Example usage
// const point1 = { lat: 37.7749, lon: -122.4194 }; // San Francisco, CA
// const point2 = { lat: 34.0522, lon: -118.2437 }; // Los Angeles, CA
// const radius = 500; // Radius in kilometers

// const point1WithinRadiusOfPoint2 = isPointWithinRadius(point1, point2, radius);

// console.log(
//   `Is point 1 within the radius of point 2? ${point1WithinRadiusOfPoint2}`
// );
