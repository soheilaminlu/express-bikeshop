require('dotenv').config()

//----IMPORTS----
const express = require("express");
const app = express();
const { NotFoundError } = require("./middlewares/errorHandlling/NotfoundError");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const passport = require("passport");
const LocalStrategy = require("passport-local");
const DBconfig = require("./configs/mongodb");
const dbUrl = "mongodb://localhost:27017/BikeShop";
const User = require("./models/Users");
const cors = require("cors");
const bikesRoute = require("./routes/Bikes");
const motorsRoute = require("./routes/MotorCycles");
const usersRoute = require("./routes/Users");
const adminRoute = require("./routes/Admin");
const uploadRoute = require("./routes/Upload-image");

//---- CORS CONFIG FOR REACT FETCH REQUESTS----
const corsOption = {
  Credential: true,
  origin: "http://localhost:3000",
};
app.use(cors(corsOption));

//-----DATABASE----

DBconfig();

//BODYPARSER
app.use(express.urlencoded({ extended: true }));

//----MULTER CONFIG FOR UPLOAD IMAGE----
app.use("/upload", uploadRoute);
app.use(express.static("images"));

//-----SESSION CONFIG----

const sessionOption = {
  name: "session",
  secret: "this is secret",
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({
    url: dbUrl,
    secret: "this is session secret",
    touchAfter: 24 * 60 * 60,
  }),
  cookie: {
    httpOnly: true,
    secure: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};
app.use(session(sessionOption));

//----PASSPORT LIBRARY FOR AUTHENTICATION----
app.use(passport.initialize());
app.use(passport.session());
const strategy = new LocalStrategy(User.authenticate());
passport.use(strategy);

passport.serializeUser((user , done) => {
  done(null , {id: user.id , role : user.role});
});
passport.deserializeUser(User.deserializeUser());


//----CONFIG ROUTES-----
app.use("/api", bikesRoute);
app.use("/api", motorsRoute);
app.use("/api", usersRoute);
app.use("/api", adminRoute);
app.use("/api", uploadRoute);
// ----NOT FOUND ERROR ----
app.all("*", NotFoundError);

//----SERVER CONNECTION ----
app.listen(5000, (req, res) => {
  console.log("Application Connected");
});
