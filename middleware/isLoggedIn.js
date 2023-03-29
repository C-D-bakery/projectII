function isUserLoggedIn(req, res, next) {
  if (req.session.currentUser) {
      next();
  } else {
      res.redirect("/login");
  }
}

//login-logout


module.exports = isUserLoggedIn;