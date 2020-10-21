const router = require('express').Router();

const TrainController = require("../controllers/TrainController");

router.get("/", TrainController.showTrains);
router.get("/add", TrainController.addTrainForm);
router.post("/add", TrainController.addTrain);
router.get("/edit/:id", TrainController.editTrainForm);
router.post("/edit/:id", TrainController.editTrain);
router.get("/delete/:id", TrainController.deleteTrain);

module.exports = router