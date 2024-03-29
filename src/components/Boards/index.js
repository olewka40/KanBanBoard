import React, { memo, useEffect, useState } from "react";
import axios from "axios";
import { Board } from "./Board";
import { BoardsContainer } from "./styled";
import { AddBoard } from "./addBoard";

export const Boards = memo(({ user }) => {
  const [boards, setBoards] = useState(null);
  const getBoards = async () => {
    const { data } = await axios.get(`api/getBoards/${user._id}`);
    setBoards(data);
  };
  useEffect(() => {
    if (user && boards === null) {
      getBoards();
    }
  }, [boards, user]);
  return (
    <>
      <AddBoard getBoards={getBoards} />
      <BoardsContainer>
        {boards &&
          boards.map(board => (
            <Board key={board._id} board={board} getBoards={getBoards} />
          ))}
      </BoardsContainer>
    </>
  );
});
