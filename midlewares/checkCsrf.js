const checkCsrf = (req, res, next) => {
  const generatedToken = req.cookies["CSRF"];
  const receivedToken = req.body._csrf;
  if (generatedToken !== receivedToken) {
    console.log("Invalid CSRF");
    res.redirect("/auth");
    return;
  }
  next();
};

module.exports = { checkCsrf };
