const Database = require("../../Database");
const json2csv = require("json2csv").parse;

const createNewBoard = async (req, res) => {
  const { boardName, userId, private } = req.body;
  const qwe = await Database.board_provider.insert({
    name: boardName ? boardName : "Новая доска",
    createTime: Date.now(),
    tasksCount: 0,
    ownerId: userId,
    private
  });

  res.json({
    status: 200,
    message: `Доска  успешно создана`,
    boardId: qwe._id
  });
};

const getBoards = async (req, res) => {
  const { userId } = req.params;
  const boards = await Database.board_provider.find({ ownerId: userId });
  res.json(boards);
};

const inversionPrivateBoard = (req, res) => {
  const { boardId, boardPrivate } = req.body;
  console.log(boardId, boardPrivate);
  Database.board_provider.update(
    { _id: boardId },
    { $set: { private: !boardPrivate } },
    {},
    function(err, numReplaced) {}
  );
  if (!boardPrivate) {
    res.json({ status: 201, message: `Доска закрыта` });
  } else {
    res.json({ status: 201, message: `Доска открыта` });
  }
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
  const tasks4 = await Database.task_provider.find({
    boardId: boardId,
    status: 4
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
      name: "Тестирование",
      background: "#4472c7",
      color: "#d1e3fb"
    },
    {
      tasks: tasks3,
      name: "Готово",
      background: "#d2f7db",
      color: "#69ab76"
    },
    {
      tasks: tasks4,
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

  res.json({ status: 201, message: `Имя доски успешно изменено` });
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

  res.json({ status: 200, message: `Доска успешно удалена!` });
};
const createCsv = async (req, res) => {
  const { boardId } = req.params;

  const tasks = await Database.task_provider.find({
    boardId: boardId
  });
  console.log(tasks);
  if (!tasks) {
    res.json({ status: 404, message: `Нет данных для выдачи файла` });
  } else {
    const dateee = json2csv(tasks, ["name", "boardId", "status", "_id"]);
    console.log(dateee, "dateee");
    res.end(dateee);
  }
};

module.exports = {
  createCsv,
  createNewBoard,
  getBoards,
  getBoardById,
  editBoardName,
  deleteBoard,
  inversionPrivateBoard
};
