const app = require("express")();
const server = require("http").Server(app);
const cookieParser = require("cookie-parser");
const Database = require("./Database");
const bodyParser = require("body-parser");
const port = parseInt(process.env.PORT, 10) || 3002;
const { v4: uuidv4 } = require("uuid");

const cors = require("cors");
const morgan = require("morgan");
const _ = require("lodash");
const express = require("express/lib/express");

const q_user = require("./queries/User");
const q_task = require("./queries/Task");
const q_board = require("./queries/Board");
const q_login = require("./queries/LogInApi");

initializeDB();

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.use(morgan("dev"));

app.post("/api/createNewBoard", q_board.createNewBoard);
app.get("/api/getBoardById/:boardId", q_board.getBoardById);
app.post("/api/createNewTask/:boardId/:taskName", q_task.createTask);
app.put("/api/editTaskName", q_task.editTaskName);
app.put("/api/editTaskStatus", q_task.editTaskStatus);

app.get("/logout", q_login.userLogout);
app.post("/api/registration", q_login.registrationUser);
app.get(
  "/api/authorization/:userName/:userPassword",
  q_login.tryAuthorizationUser
);

app.get("/api/user", q_user.getUser);
app.get("/api/getUserInfo", q_user.getUserInfo);
app.get("/api/getUsers", q_user.getUsers);

server.listen(port, err => {
  if (err) throw err;
  console.log(`> Ready on http://localhost:${port}`);
});

async function initializeDB() {
  const createdUser = await Database.user_provider.findOne();
  const createdBoard = await Database.board_provider.findOne();
  const createdTask = await Database.task_provider.findOne();

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
  if (!createdBoard) {
    Database.board_provider.insert({
      name: "Новая доска для работы",
      owner: "uuid хозяина",
      public: true
    });
  }
  if (!createdTask) {
    Database.task_provider.insert({
      name: "Маме купить свёклу",
      boardId: "FAIbvM5lrAgsGDxT",
      status: 0
    });
    Database.task_provider.insert({
      name: "Папе купить морковь",
      boardId: "FAIbvM5lrAgsGDxT",
      status: 1
    });
    Database.task_provider.insert({
      name: "Сыну купить машину",
      boardId: "FAIbvM5lrAgsGDxT",
      status: 2
    });

    Database.task_provider.insert({
      name: "Дочке купить куклу",
      boardId: "FAIbvM5lrAgsGDxT",
      status: 3
    });
  }
}
