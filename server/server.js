const app = require("express")();
const server = require("http").Server(app);
const next = require("next");
const cookieParser = require("cookie-parser");
const Database = require("./Database");
const bodyParser = require("body-parser");
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

const cors = require("cors");
const morgan = require("morgan");
const _ = require("lodash");
const express = require("express/lib/express");

initializeDB();

app.use(cookieParser());
nextApp.prepare().then(() => {
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.use(cors());
  app.use(morgan("dev"));

  app.get("/logout", (req, res) => {
    res.clearCookie("userId");
    res.send({ status: 200 });
  });

  app.post("/api/registration", async (req, res) => {
    if (
      await Database.user_provider.findOne({
        login: req.body.login
      })
    ) {
      console.log(
        "Данный пользователь уже существует, попробуйте другой логин"
      );
    } else {
      try {
        const { login, password, firstName, lastName, email } = req.body;

        Database.user_provider.insert({
          login,
          password,
          firstName,
          lastName,
          avatar: "/default_avatar.png",
          email
        });

        res.json({ status: 200 });
      } catch (err) {
        console.log(err);
        res.json({ stats: 404 });
      }
    }
  });
  app.get("/api/authorization/:userName/:userPassword", async (req, res) => {
    const { userName, userPassword } = req.params;
    if (!userName || !userPassword) {
      res.sendStatus(401);
    } else {
      const user = await Database.user_provider.findOne({
        login: userName,
        password: userPassword
      });

      if (user) {
        res.cookie("userId", user._id);
        res.send({ status: 200 });
      } else {
        res.clearCookie("userId");
        res.sendStatus(401);
      }
    }
  });

  // app.get("*", (req, res, next) => {
  //   if (!req.cookies.userId && !req.headers.userid) {
  //     if (
  //       req.originalUrl.includes("/login") ||
  //       req.originalUrl.includes("/registration")
  //     ) {
  //       return next();
  //     }
  //     return nextApp.render(req, res, "/login");
  //   }
  //   next();
  // });

  app.get("/api/user", async (req, res) => {
    const userid = req.cookies.userId;
    const user = await Database.user_provider.findOne({ _id: userid });
    // TODO: УДАЛИТЬ ПАРОЛЬ ЮЗЕРА ПРИ ВЫДАЧЕ ЧЕРЕЗ АПИ
    res.json(user);
  });

  //make uploads directory static

  app.get("/api/getUserInfo", async (req, res) => {
    const userid = req.cookies.userId;
    const userInfo = await Database.user_provider.find({
      _id: userid
    });

    res.json({
      userInfo: userInfo
    });
  });

  app.get("/api/getUsers", async (req, res) => {
    const users = await Database.user_provider.find();
    res.json({
      users
    });
  });

  app.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});

async function initializeDB() {
  const createdUser = await Database.user_provider.findOne();

  if (!createdUser) {
    Database.user_provider.insert({
      login: "1234",
      password: "1234",
      firstName: "1234",
      lastName: "1234",
      avatar: "/default_avatar.png",
      email: "123@mail.ri"
    });
  }
}
