const { getPlacesByQuery } = require("../controllers/flightController");
const express = require("express");

const router = express.Router();

router.post("/query", getPlacesByQuery);

module.exports = router;
