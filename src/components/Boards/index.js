import React, { useEffect, useState } from "react";
import axios from "axios";
import { Board } from "./Board";
import { BoardsContainer } from "./styled";
import { AddBoard } from "./addBoard";

export const Boards = () => {
  const [boards, setBoards] = useState(null);

  const getBoards = async () => {
    const { data } = await axios.get("/api/getBoards");

    console.log(data, "123");
    setBoards(data);
  };
  useEffect(() => {
    if (boards === null) {
      getBoards();
    }
  }, [boards]);
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
};
