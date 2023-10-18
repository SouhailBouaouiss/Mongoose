const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const csrf = require("csurf");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { connecting } = require("./db.js");
const { postsRouter } = require("./routes/posts.js");
const { Users } = require("./models/models.js");
const { authRouter } = require("./routes/auth.js");

const PORT = 4001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(
  session({
    secret: "HGBJdsofldsg26",
    resave: true,
    saveUninitialized: false,
  })
);
app.use(csrf({ cookie: true }));

app.use(passport.initialize());
app.use(passport.session());

connecting()
  .then(() => console.log("connecting"))

  .catch((error) => console.log(error));
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const findingUser = await Users.findOne({ email, pwd: password });
        console.log(findingUser);
        if (!findingUser) {
          done(null, false);
          return;
        } else {
          done(null, findingUser);
        }
      } catch (error) {
        console.log(error);
        done(null, false);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await Users.findOne({ id });
    console.log(id, user);
    if (!user) {
      return done(null, false);
    }
    done(null, user);
  } catch (error) {
    console.log(error);
    done(null, false);
  }
});

app.set("view engine", "ejs");
app.use("/auth", authRouter);

app.use("/home", postsRouter);

module.exports = passport;
app.listen(PORT, () => console.log("listening"));
