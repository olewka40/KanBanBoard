import axios from "axios";

const createNewBoard = async () => {
  const { data } = await axios.post("/api/createNewBoard");
  return data;
};
const editBoardName = async (boardId, boardName) =>
  await axios.put(`/api/editBoardName/`, { boardId, boardName });

const deleteBoard = async boardId =>
  await axios.post(`/api/deleteBoard`, { boardId });

export { createNewBoard, editBoardName, deleteBoard };
