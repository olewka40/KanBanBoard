const app = require("express")();
const server = require("http").Server(app);
const cookieParser = require("cookie-parser");
const Database = require("./Database");
const bodyParser = require("body-parser");
const port = parseInt(process.env.PORT, 10) || 3002;
const moment = require("moment");
const cors = require("cors");
const morgan = require("morgan");

const q_task = require("./requests/Task");
const q_board = require("./requests/Board");
const q_user = require("./requests/User");

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.use(morgan("dev"));

//user
app.post("/api/createNewUser/", q_user.createNewUser);
app.get("/api/authorization/:login/:password", q_user.authorization);
app.get("/api/getUserById/:userId", q_user.getUserById);

// boards
app.get("/api/getBoards/:userId", q_board.getBoards);
app.post("/api/createNewBoard", q_board.createNewBoard);
app.get("/api/getBoardById/:boardId", q_board.getBoardById);
app.post("/api/deleteBoard", q_board.deleteBoard);
app.put("/api/editBoardName", q_board.editBoardName);
app.put("/api/togglePrivateBoard", q_board.togglePrivateBoard);

// tasks
app.post("/api/createNewTask", q_task.createTask);
app.put("/api/editTaskName", q_task.editTaskName);
app.put("/api/editTaskStatus", q_task.editTaskStatus);
app.post("/api/deleteTask", q_task.deleteTask);

server.listen(port, err => {
  if (err) throw err;
  console.log(`> Ready on http://localhost:${port}`);
});
