const Database = require("../../Database");
const moment = require("moment");

const createNewBoard = async (req, res) => {
  const { boardName } = req.body;
  const qwe = await Database.board_provider.insert({
    name: boardName ? boardName : "Новая доска",
    createTime: new Date()
  });

  res.json({
    status: 200,
    message: `Доска  успешно создана`,
    boardId: qwe._id
  });
};

const getBoards = async (req, res) => {
  const boards = await Database.board_provider.find();
  res.json(boards);
};
const getBoardById = async (req, res) => {
  const { boardId } = req.params;
  const board = await Database.board_provider.findOne({ _id: boardId });
  const tasks0 = await Database.task_provider.find({
    boardId: boardId,
    status: 0
  });
  const tasks1 = await Database.task_provider.find({
    boardId: boardId,
    status: 1
  });
  const tasks2 = await Database.task_provider.find({
    boardId: boardId,
    status: 2
  });
  const tasks3 = await Database.task_provider.find({
    boardId: boardId,
    status: 3
  });
  board.tasks = [
    {
      tasks: tasks0,
      name: "Надо сделать",
      background: "#e0dfe1",
      color: "#706f70"
    },
    {
      tasks: tasks1,
      name: "В процессе",
      background: "#d1e3fb",
      color: "#4472c7"
    },
    {
      tasks: tasks2,
      name: "Готово",
      background: "#d2f7db",
      color: "#69ab76"
    },
    {
      tasks: tasks3,
      name: "Отказано",
      background: "#fbdedf",
      color: "#b56b73"
    }
  ];
  res.json(board);
};

const editBoardName = async (req, res) => {
  const { boardId, boardName } = req.body;

  Database.board_provider.update(
    { _id: boardId },
    { $set: { name: boardName } },
    {},
    function(err, docs) {}
  );

  res.json({ status: 201, message: `Имя задачи успешно изменено` });
};
const deleteBoard = async (req, res) => {
  const { boardId } = req.body;
  await Database.board_provider.remove(
    {
      _id: boardId
    },
    function(err, data) {}
  );
  await Database.task_provider.removeAll(
    {
      boardId: boardId
    },
    { multi: true },
    function(err, data) {}
  );

  res.json({ status: 200, message: `deleteBoard` });
};

module.exports = {
  createNewBoard,
  getBoards,
  getBoardById,
  editBoardName,
  deleteBoard
};
