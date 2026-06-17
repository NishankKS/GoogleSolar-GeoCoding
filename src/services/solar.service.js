const axios = require("axios");

async function getSolarInsights(lat, lng) {
  const response = await axios.get(
    "https://solar.googleapis.com/v1/buildingInsights:findClosest",
    {
      params: {
        "location.latitude": lat,
        "location.longitude": lng,
        requiredQuality: "HIGH",
        key: process.env.GOOGLE_API_KEY
      }
    }
  );

  return response.data;
}

module.exports = {
  getSolarInsights
};