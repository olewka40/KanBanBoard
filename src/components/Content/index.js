import React, { useEffect, useState } from "react";
import { AddTask } from "./AddTask";
import { TasksBoard } from "./TasksBoard";
import { Container, BoardName } from "./styled";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

export const Content = () => {
  const [board, setBoard] = useState([]);
  const { id } = useParams();
  const history = useHistory();

  const getBoard = async () => {
    const { data } = await axios.get(`/api/getBoardById/${id}`);
    if (data === null) {
      history.replace("/");
    }
    setBoard(data);
  };
  useEffect(() => {
    getBoard();
  }, [id]);
  return (
    <Container>
      <BoardName>{board.name}</BoardName>
      <AddTask id={board._id} getBoard={getBoard}/>
      <TasksBoard tasksColumns={board.tasks} getBoard={getBoard}/>
    </Container>
  );
};
