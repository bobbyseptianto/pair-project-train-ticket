const router = require('express').Router();

const HomeController = require("../controllers/HomeController");
const UserController = require("../controllers/UserController");


const routeTrain = require('./train-router');
const routeUser = require('./user-router');

// Home
router.get("/", HomeController.home);
router.post("/", UserController.login)
router.get("/register", UserController.registerForm)
router.post("/register", UserController.register)

// Trains
router.use("/trains", routeTrain);

// Users
router.use("/users", routeUser);

module.exports = router;