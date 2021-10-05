const Database = require("../../Database");

const createNewBoard = async (req, res) => {
  Database.board_provider.insert({
    name: "Новая доска",
    owner: "uuid хозяина",
    public: true
  });

  res.json({
    status: 200,
    message: `Доска  успешно создана`
  });
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
      name: "Корзина",
      background: "#fbdedf",
      color: "#b56b73"
    }
  ];
  res.json(board);
};

module.exports = {
  createNewBoard,
  getBoardById
};
