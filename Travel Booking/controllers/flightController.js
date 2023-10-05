const asyncHandler = require("express-async-handler");
const axios = require("axios");
const data = require("../data.json");
const { it } = require("date-fns/locale");

const getPlacesByQuery = asyncHandler(async (req, res) => {
  const { query } = req.body;

  if (!query) {
    res.status(400).json("no query data");
    throw new Error("no query data");
  }

  if (typeof query !== "string") {
    res.status(400).json("only string can be passed");
    throw new Error("only string can be passed");
  }

  const headers = {
    "Content-Type": "application/json",
    "x-api-key": "sh428739766321522266746152871799",
  };

  const queryData = {
    query: {
      market: "IN",
      locale: "en-GB",
      searchTerm: query,
    },
  };

  const fetchData = await axios.post(
    "https://partners.api.skyscanner.net/apiservices/v3/autosuggest/flights",
    queryData,
    { headers }
  );

  if (fetchData?.status !== 200) {
    res.status(400).json("couldn't get the data");
    throw new Error("couldn't get the data");
  }

  res.status(200).json(fetchData?.data);
});

const createOneWayFlightSearch = asyncHandler(async (req, res) => {
  const { from, to, depart, adult, children } = req.body;

  // if (!from || !to || !depart || !adult || !children) {
  //   res.status(400).json({ message: "some / all inputs are missing" });
  //   throw new Error("some / all inputs are missing");
  // }

  const headers = {
    "Content-Type": "application/json",
    "X-RapidAPI-Key": process.env.X_RapidAPI_Key,
    "X-RapidAPI-Host": process.env.X_RapidAPI_Host,
  };

  // const flightData = await axios.get(
  //   `https://travel-advisor.p.rapidapi.com/flights/create-session?o1=${from}&d1=${to}&dd1=${depart}&ta=${adult}&c=${children}`,
  //   { headers }
  // );

  // const sid = flightData?.data?.search_params?.sid;

  // if (!sid) {
  //   res.status(404).json("no sid value found");
  //   throw new Error("no sid value found");
  // }

  // await new Promise((resolve) => setTimeout(resolve, 500));

  // const pollData = await axios.get(
  //   `https://travel-advisor.p.rapidapi.com/flights/poll?sid=${sid}&currency=INR`,
  //   { headers }
  // );

  // if (flightData?.status !== 200 || pollData?.status !== 200) {
  //   res.status(400).json("couldn't get the data");
  //   throw new Error("couldn't get the data");
  // }

  // res.status(200).json(pollData?.data);

  const itineraries = data.itineraries;
  const carriers = data.carriers;

  const testData = itineraries.flatMap((item) => {
    return item.f.flatMap((flight) => {
      const carrierCode = flight.l[0].m || flight.l[0].o;

      const carrierName = carriers.find((carrier) => carrier.c === carrierCode);

      const results = [];

      if (carrierName) {
        results.push({
          carrier: carrierName.n,
          carrierImg: carrierName.l,
          info: flight.l[0],
          prices: item.l,
        });
      }

      return results;
    });
  });

  res.status(200).json(testData);
});

module.exports = {
  getPlacesByQuery,
  createOneWayFlightSearch,
};
