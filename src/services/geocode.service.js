const axios = require("axios");

async function getCoordinates(address) {
  const response = await axios.get(
    "https://maps.googleapis.com/maps/api/geocode/json",
    {
      params: {
        address,
        key: process.env.GOOGLE_API_KEY
      }
    }
  );

  if (
    !response.data.results ||
    response.data.results.length === 0
  ) {
    throw new Error("Address not found");
  }

  const location =
    response.data.results[0].geometry.location;

  return {
    lat: location.lat,
    lng: location.lng
  };
}

module.exports = {
  getCoordinates
};