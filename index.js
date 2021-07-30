const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();

// Routes
const userRoute = require("./routes/user.js");
const publicRoute = require("./routes/public.js");
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

// Route middlewares
app.use("/", userRoute);
app.use("/api/v1", publicRoute);

// Error handler
app.use(errorHandler);

app.listen(process.env.PORT, () =>
  console.log(`listening on port ${process.env.PORT}`)
);
