const {
  getCoordinates
} = require("../services/geocode.service");

const {
  getSolarInsights
} = require("../services/solar.service");

async function getBuildingInsights(req, res) {
  try {
    const { address } = req.query;

    if (!address) {
      return res.status(400).json({
        success: false,
        message: "address is required"
      });
    }

    // Convert Address -> Coordinates
    const coordinates =
      await getCoordinates(address);

    // Call Google Solar API
    const solarData =
      await getSolarInsights(
        coordinates.lat,
        coordinates.lng
      );

    // Return EXACT Google Response
    return res.status(200).json(solarData);

  } catch (error) {
    console.error(error.response?.data || error);

    return res.status(500).json({
      success: false,
      error:
        error.response?.data ||
        error.message
    });
  }
}

module.exports = {
  getBuildingInsights
};