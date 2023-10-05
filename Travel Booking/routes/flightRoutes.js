const {
  getPlacesByQuery,
  createOneWayFlightSearch,
} = require("../controllers/flightController");
const express = require("express");

const router = express.Router();

router.post("/query", getPlacesByQuery);
router.post("/create", createOneWayFlightSearch);

module.exports = router;
