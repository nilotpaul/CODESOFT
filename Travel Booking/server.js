const express = require("express");
const cors = require("cors");
const mongoConnect = require("./lib/db");
const cookie = require("cookie-parser");
const dotenv = require("dotenv").config();
const path = require("path");

mongoConnect();

const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

const allowedOrigins = ["http://localhost:5173", "http://localhost:5000"];
const corsOptions = {
  origin: (origin, callback) => {
    const origins = allowedOrigins.find((item) => {
      return item === origin;
    });
    if (!origin || origins) {
      callback(null, true);
    } else {
      callback(new Error("Blocked by CORS"));
    }
  },
};

app.use(cors(corsOptions));

app.use(cookie());

// user route
app.use("/api/users", require("./routes/userRoutes"));

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
