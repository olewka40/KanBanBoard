import React, { memo, useEffect, useState } from "react";
import { AddTask } from "./AddTask";
import { TasksBoard } from "./TasksBoard";
import { Container } from "./styled";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BoardTitleComponent } from "./BoardTitle";

export const Content = memo(() => {
  const [board, setBoard] = useState([]);

  const { id } = useParams();

  const getBoard = async () => {
    const { data } = await axios.get(`/api/getBoardById/${id}`);
    setBoard(data);
  };
  useEffect(() => {
    getBoard();
  }, [id]);
  return (
    <>
      <Container>
        <BoardTitleComponent board={board} getBoard={getBoard} />
        <AddTask id={board._id} getBoard={getBoard} />
        <TasksBoard tasksColumns={board.tasks} getBoard={getBoard} />
      </Container>
    </>
  );
});
