const express = require("express");
const cors = require("cors");

const solarRoutes = require("./routes/solar.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/solar", solarRoutes);

module.exports = app;