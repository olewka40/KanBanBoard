import React, { useState } from "react";
import { Card, IconButton, TextField } from "@material-ui/core";
import { BoardTitle, Actions, BoardCard } from "./styled";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import DoneIcon from "@material-ui/icons/Done";
import { deleteBoard, editBoardName } from "../../axiosRequests/board";
import { Close } from "@material-ui/icons";
import moment from "moment";
import "moment/locale/ru";

moment.locale("ru");
export const Board = ({ board, getBoards }) => {
  const [edit, setEdit] = useState(false);
  const [newBoardName, setNewBoardName] = useState("");

  return (
    <BoardCard>
      {!edit ? (
        <>
          <BoardTitle to={`/board/${board._id}`}>
            Название доски: {board.name} <br />
            <br /> Дата создания: {moment(board.creationTime).fromNow()}
          </BoardTitle>
          <Actions>
            <IconButton
              onClick={() => {
                setEdit(true);
              }}
            >
              <EditIcon color="primary" />
            </IconButton>
            <IconButton
              onClick={() => {
                deleteBoard(board._id).then(() => {
                  getBoards();
                });
              }}
            >
              <DeleteIcon color="error" />
            </IconButton>
          </Actions>
        </>
      ) : (
        <>
          <TextField
            variant="outlined"
            placeholder="Введите новое имя"
            onChange={e => {
              setNewBoardName(e.target.value);
            }}
          />
          <IconButton
            onClick={() => {
              setEdit(false);
            }}
          >
            <Close color="error" />
          </IconButton>
          <IconButton
            onClick={() => {
              if (newBoardName === "") return;
              editBoardName(board._id, newBoardName).then(() => {
                setEdit(false);
                getBoards();
              });
            }}
          >
            <DoneIcon color="primary" />
          </IconButton>
        </>
      )}
    </BoardCard>
  );
};
