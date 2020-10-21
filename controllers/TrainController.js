const { Train } = require("../models/index");
const formatMoney = require("../helpers/formatMoney");

class TrainController {

  static showTrains(req, res) {
    Train.findAll({ order : [["train_name", "ASC"]] })
    .then((instanceTrain) => {
      for (let i = 0; i < instanceTrain.length; i++) {
        instanceTrain[i]["newPrice"] = formatMoney(instanceTrain[i].price);
      }
      res.render("trains", {instanceTrain})
    })
    .catch((err) => {
      res.send(err)
    });
  }

  static addTrainForm(req, res) {
    res.render("addTrainForm");
  }

  static addTrain(req, res) {
    const {train_name, route, depart_time, arrived_time, class_type, price} = req.body;
    let trainObj = {
      train_name,
      route,
      depart_time,
      arrived_time,
      class_type,
      price
    };
    Train.create(trainObj)
    .then((instanceTrain) => {
      res.redirect("/trains")
    })
    .catch((err) => {
      res.send(err);
    });
  }

  static editTrainForm(req, res) {
    let id = +req.params.id;
    let instanceTrain = [];
    Train.findByPk(id)
    .then((result) => {
      instanceTrain.push(result);
      res.render("editTrainForm", {instanceTrain})
    })
    .catch((err) => {
      res.send(err)
    });
  }

  static editTrain(req, res) {
    let id = +req.params.id;
    const {train_name, route, depart_time, arrived_time, class_type, price} = req.body;
    let trainObj = {
      train_name,
      route,
      depart_time,
      arrived_time,
      class_type,
      price
    };
    Train.update(trainObj, { where : { id : id } })
    .then((instanceTrain) => {
      res.redirect("/trains");
    })
    .catch((err) => {
      res.send(err);
    });
  }

  static deleteTrain(req, res) {
    let id = +req.params.id;
    Train.destroy({ where : { id : id } })
    .then((instanceTrain) => {
      res.redirect("/trains");
    }).catch((err) => {
      res.send(err);
    });
  }

}

module.exports = TrainController;