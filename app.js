// Express
const express = require("express");
const app = express();
const router = require("./routers/router");
const PORT = 3000;

// Setup
app.set("view engine", "ejs");

// BodyParser
app.use(express.urlencoded({extended: false}));

app.use("/", router);

// Listen
app.listen(PORT, () => {
  console.log(`Visit Book My Train at http://localhost:${PORT}`);
});