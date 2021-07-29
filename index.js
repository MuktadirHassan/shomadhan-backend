const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();

// Routers
const publicRouter = require("./routes/public.js");
const protectedRouter = require("./routes/protected.js");

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
app.use("/api/v1/", publicRouter);
app.use("/api/v1/secure/", protectedRouter);

// Error handler
app.use((err, req, res, next) => {
  console.log(err.message);
  res
    .send(
      "Something went wrong. Contact the server administrator and have a relax. See you not for mind."
    )
    .status(503);
});

app.listen(process.env.PORT, () =>
  console.log(`listening on port ${process.env.PORT}`)
);
