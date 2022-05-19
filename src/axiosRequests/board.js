import axios from "axios";

const createNewBoard = async (boardName, userId) => {
  const { data } = await axios.post("/api/createNewBoard", {
    boardName,
    userId,
    private: true
  });
  return data;
};
const editBoardName = async (boardId, boardName) =>
  await axios.put(`/api/editBoardName/`, { boardId, boardName });

const deleteBoard = async boardId =>
  await axios.post(`/api/deleteBoard`, { boardId });

const inversionPrivate = async ( board ) => {

  const { data } = await axios.put(`/api/togglePrivateBoard`, {
    boardId: board._id,
    boardPrivate: board.private
  });
  return data;
};

export { createNewBoard, editBoardName, deleteBoard, inversionPrivate };
