const express = require("express");

const {
  getBuildingInsights
} = require("../controllers/solar.controller");

const router = express.Router();

router.get("/building-insights", getBuildingInsights);

module.exports = router;