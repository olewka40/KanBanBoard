const Database = require("../../Database");

const createTask = async (req, res) => {
  const { taskName, boardId } = req.body;
  const currentBoard = await Database.board_provider.findOne({ _id: boardId });

  Database.task_provider.insert({
    name: taskName,
    boardId: boardId,
    status: 0
  });
  Database.board_provider.update(
    { _id: boardId },
    { $set: { tasksCount: currentBoard.tasksCount + 1 } },
    {},
    function(err, docs) {}
  );

  res.json({ status: 201, message: `Задача  успешно создана` });
};

const editTaskStatus = async (req, res) => {
  const { taskId, taskStatus } = req.body;

  Database.task_provider.update(
    { _id: taskId },
    { $set: { status: taskStatus } },
    {},
    function(err, docs) {}
  );

  res.json({ status: 201, message: `Задача  успешно изменена` });
};
const editTaskName = async (req, res) => {
  const { taskId, taskName } = req.body;

  Database.task_provider.update(
    { _id: taskId },
    { $set: { name: taskName } },
    {},
    function(err, docs) {}
  );

  res.json({ status: 201, message: `Имя задачи успешно изменено` });
};

const deleteTask = async (req, res) => {
  const { taskId, boardId } = req.body;
  const currentBoard = await Database.board_provider.findOne({ _id: boardId });

  await Database.task_provider.remove(
    {
      _id: taskId
    },
    function(err, data) {}
  );
   Database.board_provider.update(
    { _id: boardId },
    { $set: { tasksCount: currentBoard.tasksCount - 1 } },
    {},
    function(err, docs) {}
  );

  res.json({ status: 201, message: `Задача успешно удалена` });
};

module.exports = {
  createTask,
  deleteTask,
  editTaskName,
  editTaskStatus
};
