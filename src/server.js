/* eslint-disable func-names */
/* made by KBZ david.aleixo@knowledgebiz.pt */

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const passport = require("passport");
const jwt = require("express-jwt");
const cors = require("cors");
const morgan = require("morgan");
const config = require("./config/config.json");
const logger = require("./config/logger");

// express app
const app = express();

// cors configuration
if (config.cors.allow) {
  logger.info("CORS is allowed!");
  app.use(cors());
}

// middleware configuration
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressValidator());

// authentication
require("./config/passport");

app.use(passport.initialize());

// set the need of tokens for authentication unless the following paths
app.use(
  "/api",
  jwt({
    secret: config.jwt.secret
  }).unless({
    path: ["/api/login", "/api/register"]
  })
);
// set API routes
app.use("/api", require("./routes"));

// set Angular static files
app.use(
  express.static(
    path.join(path.normalize(__dirname), "../../views/app24/dist/app24")
  )
);

// Serve Angular app - let the Angular decide every what to do with every route by using '*'
app.get("*", (req, res, next) => {
  res.sendFile("index.html", {
    root: path.join(path.normalize(__dirname), "../../views/app24/dist/app24")
  });
});

// Catch unauthorised errors
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401);
    res.json({ message: `${err.name}: ${err.message}` });
  }
});

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

const port = process.env.API_PORT || "4200";
app.listen(port, () => logger.info("API running at ", port));

module.exports = app;
