// Express
const express = require("express");
const app = express();
const router = require("./routers/router");
const session = require('express-session');
const PORT = 3000;

// Setup
app.set("view engine", "ejs");

// BodyParser
app.use(express.urlencoded({extended: false}));

// Session
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    sameSite: true
  }
}))

app.use("/", router);

// Listen
app.listen(PORT, () => {
  console.log(`Visit Book My Train at http://localhost:${PORT}`);
});