const Database = require("../../Database");

const createTask = async (req, res) => {
  const { taskName, boardId } = req.params;
  Database.task_provider.insert({
    name: taskName,
    boardId: boardId,
    status: 0
  });

  res.json({ status: 201, message: `Задача  успешно создана` });
};

const editTaskStatus = async (req, res) => {
  const { taskId, taskStatus } = req.body;

  Database.task_provider.update(
    { _id: taskId },
    { $set: { status: taskStatus } },
    {},
    function(err, numReplaced) {
      console.log("replaced---->" + numReplaced);
    }
  );

  res.json({ status: 201, message: `Задача  успешно изменена` });
};
const editTaskName = async (req, res) => {
  const { taskId, taskName } = req.body;

  Database.task_provider.update(
    { _id: taskId },
    { $set: { name: taskName } },
    {},
    function(err, numReplaced) {
      console.log("replaced---->" + numReplaced);
    }
  );

  res.json({ status: 201, message: `Имя задачи успешно изменено` });
};

module.exports = {
  createTask,
  editTaskName,
  editTaskStatus
};
