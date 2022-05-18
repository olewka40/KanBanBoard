import React, { memo, useContext, useEffect, useState } from "react";
import { AddTask } from "./AddTask";
import { TasksBoard } from "./TasksBoard";
import { Container } from "./styled";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BoardTitleComponent } from "./BoardTitle";
import { UserContext } from "../context/UserContext";

export const Content = memo(() => {
  const { user } = useContext(UserContext);
  const { id } = useParams();

  const [board, setBoard] = useState({});

  const getBoard = async () => {
    const { data } = await axios.get(`/api/getBoardById/${id}`);
    setBoard(data);
  };
  let userOwner =
    board.ownerId === JSON.parse(localStorage.getItem("userSessionBoard"))._id;

  console.log(123);
  useEffect(() => {
    getBoard();
  }, [id]);
  return (
    <>
      {!!board && (
        <Container>
          <BoardTitleComponent
            userOwner={userOwner}
            board={board}
            getBoard={getBoard}
          />
          {userOwner && <AddTask id={board._id} getBoard={getBoard} />}
          <TasksBoard
            userOwner={userOwner}
            tasksColumns={board.tasks}
            getBoard={getBoard}
            boardId={board._id}
          />
        </Container>
      )}
    </>
  );
});
