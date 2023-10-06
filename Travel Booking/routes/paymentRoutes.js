const express = require("express");
const { createStripeSession } = require("../controllers/paymentController");
const protectRoutes = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/create-checkout-session", protectRoutes, createStripeSession);

module.exports = router;
