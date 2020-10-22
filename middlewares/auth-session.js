const isLogin = function (req, res, next) {
  if (!req.session.UserId) {
    res.redirect(`/?error=${`Please Login First!`}`);
  } else {
    console.log('Time:', Date.now())
    next()
  }
}

module.exports = isLogin;