const app = require("express")();
const server = require("http").Server(app);
const cookieParser = require("cookie-parser");
const Database = require("./Database");
const bodyParser = require("body-parser");
const port = parseInt(process.env.PORT, 10) || 3002;

const cors = require("cors");
const morgan = require("morgan");
const _ = require("lodash");
const express = require("express/lib/express");

const q_task = require("./requests/Task");
const q_board = require("./requests/Board");

initializeDB();

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.use(morgan("dev"));

// boards
app.get("/api/getBoards", q_board.getBoards);
app.post("/api/createNewBoard", q_board.createNewBoard);
app.get("/api/getBoardById/:boardId", q_board.getBoardById);
app.post("/api/deleteBoard", q_board.deleteBoard);
app.put("/api/editBoardName", q_board.editBoardName);

// tasks
app.post("/api/createNewTask", q_task.createTask);
app.put("/api/editTaskName", q_task.editTaskName);
app.put("/api/editTaskStatus", q_task.editTaskStatus);
app.post("/api/deleteTask", q_task.deleteTask);

server.listen(port, err => {
  if (err) throw err;
  console.log(`> Ready on http://localhost:${port}`);
});

async function initializeDB() {
  const createdBoard = await Database.board_provider.findOne();
  const createdTask = await Database.task_provider.findOne();

  if (!createdBoard) {
    Database.board_provider.insert({
      name: "Новая доска для работы",
      public: true,
      _id: "x56rmdcomuzn90VS"
    });
  }
  if (!createdTask) {
    Database.task_provider.insert({
      name: "Маме купить свёклу",
      boardId: "x56rmdcomuzn90VS",
      status: 0
    });
    Database.task_provider.insert({
      name: "Папе купить морковь",
      boardId: "x56rmdcomuzn90VS",
      status: 1
    });
    Database.task_provider.insert({
      name: "Сыну купить машину",
      boardId: "x56rmdcomuzn90VS",
      status: 2
    });

    Database.task_provider.insert({
      name: "Дочке купить куклу",
      boardId: "x56rmdcomuzn90VS",
      status: 3
    });
  }
}
