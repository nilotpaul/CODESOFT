const asyncHandler = require("express-async-handler");
const stripe = require("stripe")(process.env.STRIPE_SECRET);

const domain = process.env.DOMAIN;

const createStripeSession = asyncHandler(async (req, res) => {
  const { price, name } = req.body;

  if (!price || !name) {
    res.status(400).json({ message: "price or name not found" });
    throw new Error("price or name not found");
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "inr",
          unit_amount: Number(price) * 100,
          product_data: {
            name,
          },
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${domain}`,
    cancel_url: `${domain}`,
  });

  if (!session || !session?.url) {
    res.status(400).json({ message: "something went wrong" });
  }

  res.status(200).json(session);
});

module.exports = { createStripeSession };
