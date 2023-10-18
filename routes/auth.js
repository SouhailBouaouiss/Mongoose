const { Router } = require("express");
const passport = require("passport");
const { checkCsrf } = require("../midlewares/checkCsrf");
const { Users } = require("../models/models");
const { body, validationResult } = require("express-validator");
const { v4: uuidv4 } = require("uuid");

const authRouter = Router();

authRouter.get("/", (req, res, next) => {
  const generatedToken = req.csrfToken();
  res.cookie("CSRF", generatedToken);

  res.render("login", { csrf: generatedToken });
});

authRouter.post(
  "/",
  passport.authenticate("local", { failureRedirect: "/auth" }),
  (req, res, next) => {
    res.redirect("/home");
  }
);
authRouter.post(
  "/signup",
  [
    body("name").isLength({ min: 3 }),
    body("email").isEmail(),
    body("password").isStrongPassword(),
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.send("Qad lmasa2il");
    } else {
      // If validation passes, handle the request
      // Access validated data using req.body
      const { name, email, password } = req.body;

      await Users.create({
        name,
        email,
        pwd: password,
        id: uuidv4(),
      });

      res.send("safi tqda lgharad");
    }
  }
);

module.exports = { authRouter };
