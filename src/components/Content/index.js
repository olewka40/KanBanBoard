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

  const [board, setBoard] = useState(null);

  const getBoard = async () => {
    const { data } = await axios.get(`/api/getBoardById/${id}`);
    setBoard(data);
  };
  const canEditAccess = () => {
    if (!board) return false;
    if (user) {
      const cannEditUserArray = board?.canEdit;
      if (!cannEditUserArray) return false;
      const checkAccess = cannEditUserArray.find(u => u.id === user._id)?.id;
      return !!checkAccess;
    } else {
      return false;
    }
  };
  const userOwner = (board && board.ownerId) === user?._id;

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
            canEditAccess={canEditAccess}
          />
          {(userOwner || canEditAccess()) && (
            <AddTask id={board._id} getBoard={getBoard} />
          )}
          <TasksBoard
            userOwner={userOwner}
            canEditAccess={canEditAccess}
            tasksColumns={board.tasks}
            getBoard={getBoard}
            boardId={board._id}
          />
        </Container>
      )}
    </>
  );
});
