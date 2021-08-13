const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
// const morgan = require("morgan");

// Routes
const publicRoute = require("./routes/public.js");
const adminRoute = require("./routes/admin");
const errorHandler = require("./middlewares/errorHandler.js");

// Database connection
mongoose.connect(
  process.env.DB_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => err && console.log(err)
);

// Middlewares
app.use(express.json());
app.use(cors());
// For logging
// app.use(morgan("tiny"));

// Route middlewares
app.use("/api/v1", publicRoute);
app.use("/admin", adminRoute);

// Error handler
app.use(errorHandler);

app.listen(process.env.PORT, () =>
  console.log(`listening on port ${process.env.PORT}`)
);
