const express = require("express");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
// const helmet = require('helmet');
const xssClean = require("xss-clean");
const expressRateLimit = require("express-rate-limit");
const hpp = require("hpp");
const cors = require("cors");
const logger = require("./logger");
const config = require("../config");

const configureMiddleware = (app) => {
  // Body-parser middleware
  app.use(express.json());

  // Cookie Parser
  app.use(cookieParser());

  // MongoDB data sanitizer
  app.use(mongoSanitize());

  // Helmet improves API security by setting some additional header checks
  // app.use(helmet());

  // Additional protection against XSS attacks
  app.use(xssClean());

  // Add rate limit to API (100 requests per 10 mins)
  app.use(
    expressRateLimit({
      windowMs: 10 * 60 * 1000,
      max: 100,
    }),
  );

  // Prevent http param pollution
  app.use(hpp());

  // Enable CORS - allow requests from frontend in production
  const corsOptions = {
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (process.env.NODE_ENV === "production") {
        const allowedOrigins = [
          process.env.FRONTEND_URL,
          "http://localhost:3000",
          "http://localhost:3030",
        ];
        // Filter out undefined values (in case FRONTEND_URL is not set)
        const validOrigins = allowedOrigins.filter(Boolean);
        if (!origin || validOrigins.indexOf(origin) !== -1) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      } else {
        // Allow all origins in development
        callback(null, true);
      }
    },
    credentials: true,
  };
  app.use(cors(corsOptions));

  // Custom logging middleware
  app.use(logger);
};

module.exports = configureMiddleware;
