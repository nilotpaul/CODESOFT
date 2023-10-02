const asyncHandler = require("express-async-handler");
const axios = require("axios");

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

  if (fetchData.status !== 200) {
    res.status(400).json("couldn't get the data");
    throw new Error("couldn't get the data");
  }

  res.status(200).json(fetchData.data);
});

module.exports = {
  getPlacesByQuery,
};
