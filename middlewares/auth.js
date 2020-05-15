module.exports = (req, res, next) => {
  const { user } = req.session;
  
  if (!user) {
    return res.redirect("/");
  } else {
    res.locals.user = user;
    return next();
  }
}
