const { User } = require("../models/index");
const bcrypt = require('bcryptjs');

class UserController {

  static registerForm(req, res) {
    res.render("registerUserForm")
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
      res.send(err)
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

}

module.exports = UserController;