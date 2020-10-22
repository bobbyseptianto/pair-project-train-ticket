const { Train, User, BookTicket } = require("../models/index");
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
    const message = req.app.locals.message || '';
    delete req.app.locals.message;
    res.render("addTrainForm", {message});
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
      if(err.name === "SequelizeValidationError") {
        if(err.errors.length > 0) {
          let errors = err.errors.map(error => {
            return error.message;
          });
          req.app.locals.message = errors;
        }
        res.redirect("/trains/add")
      } else {
        res.send(err);
      }
    });
  }

  static editTrainForm(req, res) {
    let id = +req.params.id;
    let instanceTrain = [];
    Train.findByPk(id)
    .then((result) => {
      instanceTrain.push(result);
      const message = req.app.locals.message || '';
      delete req.app.locals.message;
      res.render("editTrainForm", {instanceTrain, message})
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
      if(err.name === "SequelizeValidationError") {
        if(err.errors.length > 0) {
          let errors = err.errors.map(error => {
            return error.message;
          });
          req.app.locals.message = errors;
        }
        res.redirect(`/trains/edit/${id}`);
      } else {
        res.send(err);
      }
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

  static seePassengers(req, res) {
    let id = +req.params.id;
    let instanceTrain = [];
    Train.findByPk(id)
    .then((result) => {
      instanceTrain.push(result);
      return User.findAll({ include : BookTicket })
    })
    .then(user => {
      res.render("seePassengers", {user, instanceTrain})
    })
    .catch((err) => {
      res.send(err)
    });
  }

}

module.exports = TrainController;