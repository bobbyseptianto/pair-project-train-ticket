class HomeController {

  static home(req, res) {
    const {error} = req.query;
    res.render("home", {error});
  }

}

module.exports = HomeController;