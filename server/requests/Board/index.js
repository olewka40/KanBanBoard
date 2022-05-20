const Database = require("../../Database");

const createNewBoard = async (req, res) => {
  const { boardName, userId, private } = req.body;
  const qwe = await Database.board_provider.insert({
    name: boardName ? boardName : "Новая доска",
    createTime: Date.now(),
    canEdit: null,
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

const togglePrivateBoard = (req, res) => {
  const { boardId, boardPrivate } = req.body;
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
  const owner = await Database.user_provider.findOne({ _id: board.ownerId });
  console.log(owner,"ownerLogin");
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

  board.ownerLogin = owner.login;
  board.tasks = [
    {
      tasks: tasks0,
      tasksCount: tasks0.length,
      name: "Надо сделать",
      background: "#e0dfe1",
      color: "#706f70"
    },
    {
      tasks: tasks1,
      tasksCount: tasks1.length,
      name: "В процессе",
      background: "#d1e3fb",
      color: "#4472c7"
    },
    {
      tasks: tasks2,
      tasksCount: tasks2.length,
      name: "Тестирование",
      background: "#4472c7",
      color: "#d1e3fb"
    },
    {
      tasks: tasks3,
      tasksCount: tasks3.length,
      name: "Готово",
      background: "#d2f7db",
      color: "#69ab76"
    },
    {
      tasks: tasks4,
      name: "Отказано",
      tasksCount: tasks4.length,
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

  res.json({ status: 200, message: `Имя доски успешно изменено` });
};
const editBoardAccess = async (req, res) => {
  const { boardId, usersIdWhoCanEditArray } = req.body;

  Database.board_provider.update(
    { _id: boardId },
    { $set: { canEdit: usersIdWhoCanEditArray } },
    {},
    function(err, docs) {}
  );

  res.json({ status: 200, message: `Параметры приватности доски изменены` });
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

module.exports = {
  createNewBoard,
  getBoards,
  getBoardById,
  editBoardName,
  deleteBoard,
  togglePrivateBoard,
  editBoardAccess
};
