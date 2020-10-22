const { User, Train, BookTicket } = require("../models/index");
const bcrypt = require('bcryptjs');
const formatMoney = require("../helpers/formatMoney");
const estimation = require("../helpers/estimationTravelTime");

var nodemailer = require('nodemailer');

class UserController {

  static registerForm(req, res) {
    const message = req.app.locals.message || '';
    delete req.app.locals.message;
    res.render("registerUserForm", {message})
  }

  static register(req, res) {
    const {first_name, last_name, username, password, email, gender, address} = req.body;
    let userObj = {
      first_name,
      last_name,
      username,
      password,
      email,
      gender,
      address
    }
    User.create(userObj)
    .then((result) => {
      res.redirect("/")
    }).catch((err) => {
      if(err.name === "SequelizeValidationError") {
        if(err.errors.length > 0) {
          let errors = err.errors.map(error => {
            return error.message;
          });
          req.app.locals.message = errors;
        }
        res.redirect("/register")
      } else {
        res.send(err);
      }
    });
  }

  static login(req, res) {
    const {username, password} = req.body
    User.findOne({ where : {username} })
    .then((user) => {
      if (user) {
        if (bcrypt.compareSync(password, user.password)) {

          req.session.UserId = user.id;

          return res.redirect(`/users/${user.id}`);
        } else {
          const error = `Invalid Username/Password!`;
          return res.redirect(`/?error=${error}`);
        }
      } else {
        const error = `Invalid Username/Password!`;
        return res.redirect(`/?error=${error}`);
      }
    }).catch((err) => {
      res.send(err)
    });
  }

  static logout(req, res) {
    req.session.destroy((err) => {
      if (err) {
        res.send(err);
      } else {
        res.redirect("/");
      }
    })
  }

  static showUserLogin(req, res) {
    const id = +req.params.id;
    User.findOne({ where : {id} })
    .then((user) => {
      res.render("users", {user})
    }).catch((err) => {
      res.send(err);
    });
  }

  static showUserProfile(req, res) {
    let id = +req.params.id;
    User.findOne({where: {id}})
    .then((user) => {
      res.render("profile", {user});
    }).catch((err) => {
      res.send(err);
    });
  }

  static editProfileForm(req, res) {
    let id = +req.params.id;
    let user = [];
    User.findByPk(id)
    .then((result) => {
      user.push(result);
      const message = req.app.locals.message || '';
      delete req.app.locals.message;
      res.render("editProfileForm", {user, message})
    })
    .catch((err) => {
      res.send(err)
    });
  }

  static editProfile(req, res) {
    let id = +req.params.id;
    const {first_name, last_name, email, gender, address} = req.body;
    let userObj = {
      first_name,
      last_name,
      email,
      gender,
      address
    }
    User.update(userObj, { where : { id : id } })
    .then((user) => {
      res.redirect(`/users/${id}/profile`);
    })
    .catch((err) => {
      if(err.name === "SequelizeValidationError") {
        if(err.errors.length > 0) {
          let errors = err.errors.map(error => {
            return error.message;
          });
          req.app.locals.message = errors;
        }
        res.redirect(`/users/${id}/profile/edit`)
      } else {
        res.send(err);
      }
    });
  }

  static deleteProfileAccount(req, res) {
    let id = +req.params.id;
    User.destroy({ where : { id : id } })
    .then((user) => {
      res.redirect("/logout");
    }).catch((err) => {
      res.send(err);
    });
  }

  static bookTicketForm(req, res) {
    let id = +req.params.id;
    let user = [];
    User.findByPk(id)
    .then((result) => {
      user.push(result);
      return Train.findAll({ order : [["train_name", "ASC"]] })
    })
    .then((instanceTrain) => {
      for (let i = 0; i < instanceTrain.length; i++) {
        instanceTrain[i]["newPrice"] = formatMoney(instanceTrain[i].price);
      }
      const message = req.app.locals.message || '';
      delete req.app.locals.message;
      res.render("bookTicket", {user, instanceTrain, message})
    })
    .catch((err) => {
      res.send(err)
    });
  }

  static bookTicket(req, res) {
    let UserId = +req.params.id;
    const {depart_date, from, to, class_type, TrainId} = req.body;
    let bookTicketObj = {
      depart_date,
      from,
      to,
      class_type,
      UserId,
      TrainId
    }
    BookTicket.create(bookTicketObj)
    .then((bookTicket) => {
      res.redirect(`/users/${UserId}/my-ticket`);
    }).catch((err) => {
      if(err.name === "SequelizeValidationError") {
        if(err.errors.length > 0) {
          let errors = err.errors.map(error => {
            return error.message;
          });
          req.app.locals.message = errors;
        }
        res.redirect(`/users/${UserId}/book-ticket`)
      } else {
        res.send(err);
      }
    });
  }

  static showMyTicket(req, res) {
    let id = +req.params.id;
    let user = [];
    User.findByPk(id)
    .then((result) => {
      user.push(result);
      return Train.findAll({order: [["train_name", "ASC"]], include: [BookTicket]});
    })
    .then((instanceTrain) => {
      for (let i = 0; i < instanceTrain.length; i++) {
        instanceTrain[i]["newPrice"] = formatMoney(instanceTrain[i].price);
        instanceTrain[i]["estimation"] = estimation(instanceTrain[i].arrived_time, instanceTrain[i].depart_time);
      }
      res.render("seeMyTicket", {user, instanceTrain})
    })
    .catch((err) => {
      res.send(err)
    });
  }

  static eticket(req, res) {
    let paramsEmailId = req.params.emailid.split('-');
    let email = paramsEmailId[0];
    let bookTicketId = paramsEmailId[1];
    BookTicket.findOne({where:{id: bookTicketId}, include: [Train]})
    .then((result) => {
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'bookmytrainxxx@gmail.com',
          pass: 'bookmytrain99'
        }
      });
      
      var mailOptions = {
        from: 'bookmytrainxxx@gmail.com',
        to: email,
        subject: 'E-TICKET',
        text: `
        THIS IS YOUR E-TICKET

        Booking Code : ${result.booking_code}

        DATE : ${result.depart_date}
        ROUTE: ${result.Train.route}
        TRAIN: ${result.Train.train_name}
        DPT  : ${result.Train.depart_time}
        ETA  : ${result.Train.arrived_time}
        CLASS: ${result.Train.class_type}
        PRICE: ${result.Train.price}

        Bayar tiketmu maksimum 24 Jam setelah email ini diterima!
        `
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      res.redirect(`/users/${result.UserId}/my-ticket`);
    }).catch((err) => {
      res.send(err);
    });
  }

}

module.exports = UserController;