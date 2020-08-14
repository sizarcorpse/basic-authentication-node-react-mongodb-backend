const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const middlewares = require("./middlewares/middlewares");

const app = express();
app.use(helmet());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    // eslint-disable-next-line comma-dangle
    credentials: true,
  })
);

mongoose.connect(
  process.env.MONGODB_URI,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => console.log("connected to mongoDB")
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const authRoute = require("./api/routes/user/Authentication");
app.use("/api/user", authRoute);

app.get("/", (req, res) => {
  res.json({
    message: "Basic Authentication w/ Node | React | MongoDB",
  });
});

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

const port = process.env.PORT || 3333;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
