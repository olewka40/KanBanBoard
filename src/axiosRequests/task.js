import axios from "axios";

const createNewTask = async (boardId, taskName) =>
  await axios.post(`/api/createNewTask/${boardId}/${taskName}`);
const editTaskName = async (taskId, taskName) =>
  await axios.put(`/api/editTaskName/`, { taskId, taskName });
const editTaskStatus = async (taskId, taskStatus) =>
  await axios.put(`/api/editTaskStatus`, { taskId, taskStatus });
export { createNewTask, editTaskName, editTaskStatus };
