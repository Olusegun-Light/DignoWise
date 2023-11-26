const path = require("path");
const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const cors = require("cors");

const dotenv = require("dotenv");
const session = require("express-session");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const userRouter = require("./routes/userRoute");
const medRouter = require("./routes/medsRoute");

const app = express();

// app.enable("trust proxy");

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// Global Middleware

// Implement CORS
app.use(cors());
// Access-Control-Allow-Origin *
app.options("*", cors());

//  Serving static files
app.use(express.static(path.join(__dirname, "public")));

// Set security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(morgan("dev"));

// Limit request from same Ip
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from thus IP, please try again in an hour",
});
app.use("/api", limiter);

//  3rd party middleware
// Body parser (reading data from the body into req.body)
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());

//  Data sanitization against NoSQL query injection
app.use(mongoSanitize());

//  Data sanitization against XSS
app.use(xss());

//  Serving static files
app.use(express.static(`${__dirname}/public`));

app.use(compression());

// Test middleware
app.use((req, res, next) => {
  // console.log("hello from the middleware");
  req.requestTime = new Date().toISOString();
  // console.log(req.cookies);
  next();
});

// Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/meds", medRouter);

// Handling unhandled routes
// For all http methods
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// Error handling middleware
app.use(globalErrorHandler);

// Server
module.exports = app;
