# 🌞 Google Solar API – Building Insights Node.js Service
 
A Node.js + Express backend that converts a street address into solar intelligence using:
 
- Google Geocoding API (address → lat/lng)
- Google Solar API (lat/lng → building solar insights)

It returns a **complete solar feasibility JSON report** including:
- Roof size & geometry
- Solar panel capacity
- Energy production estimates
- Financial ROI analysis
- Carbon offset data
---

### Example Request
```bash
curl "http://localhost:3000/api/solar/building-insights?address=1%20Apple%20Park%20Way,%20Cupertino,%20CA"
```
 
### Example Response (shortened)
```json
{
  "name": "buildings/ChIJ...",
  "center": {
    "latitude": 37.33,
    "longitude": -122.01
  },
  "solarPotential": {
    "maxArrayPanelsCount": 34,
    "maxArrayAreaMeters2": 66.76,
    "maxSunshineHoursPerYear": 1769.6
  }
}
```
 
---

# 📊 Understanding Google Solar API JSON Response
 
This section explains how to interpret the Solar API `buildingInsights` response.
 
## 🧠 High-Level Structure
 
The response contains 6 major blocks:
 
```text
1. Building Metadata
2. Location & Imagery Data
3. Roof Geometry
4. Solar Potential
5. Solar Panel Layout Simulation
6. Financial Analysis
```
 
---
 
### 🏠 1. Building Metadata
```json
{
  "name": "buildings/XYZ",
  "center": {
    "latitude": 37.33,
    "longitude": -122.01
  }
}
```
**Meaning:**
- Unique building ID
- Exact geo-center of detected building
👉 Used for mapping & database storage
 
---
 
### 📍 2. Location & Imagery Data
```json
{
  "imageryDate": "2023-09-11",
  "imageryQuality": "HIGH"
}
```
**Meaning:**
- When satellite image was captured
- Quality of roof detection
👉 `HIGH` = most accurate solar modeling
 
---
 
### 🏠 3. Roof Geometry
```json
{
  "wholeRoofStats": {
    "areaMeters2": 97.14
  }
}
```
**Meaning:**
- Total usable roof area
- Used to estimate panel capacity
---
 
### ☀️ 4. Solar Potential (MOST IMPORTANT)
```json
{
  "maxArrayPanelsCount": 34,
  "maxArrayAreaMeters2": 66.76,
  "maxSunshineHoursPerYear": 1769.6
}
```
**Meaning:**
 
| Field | Meaning |
|---|---|
| `maxArrayPanelsCount` | Max panels possible |
| `maxArrayAreaMeters2` | Usable solar installation area |
| `maxSunshineHoursPerYear` | Solar exposure per year |
 
👉 This tells you how big the system can be and how much sun the roof gets.
 
---
 
### ⚡ 5. Energy Production Simulation
```json
{
  "panelsCount": 34,
  "yearlyEnergyDcKwh": 22956
}
```
**Meaning:** Estimated yearly energy output.
 
👉 Example interpretation: 34 panels → ~22,956 kWh/year — enough for medium household consumption or EV charging support.
 
---
 
### 💰 6. Financial Analysis
```json
{
  "paybackYears": 5.9,
  "savingsLifetime": 52841
}
```
**Meaning:**
 
| Field | Meaning |
|---|---|
| `paybackYears` | Time to recover investment |
| `savingsLifetime` | Total savings over system life |
| `financiallyViable` | Whether solar is worth it |
 
👉 If payback < 7 years → strong solar investment
 
---
 
### 🧩 7. Roof Segments (Advanced)
```json
"roofSegmentStats": []
```
**Meaning:** Roof is split into sections. Each segment has:
- Angle (pitch)
- Direction (azimuth)
- Sun exposure
👉 Used for advanced panel placement optimization
 
---
 
### 🧱 8. Solar Panel Layout
```json
"solarPanels": [
  {
    "center": {
      "latitude": 37.33,
      "longitude": -122.01
    },
    "yearlyEnergyDcKwh": 700
  }
]
```
**Meaning:** Each panel contains:
- Exact position on roof
- Expected energy output per panel
👉 Used for 3D visualization and installer tools
 
---