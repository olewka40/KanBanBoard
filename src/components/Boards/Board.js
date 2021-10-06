import React, { useState } from "react";
import { Card, IconButton, TextField } from "@material-ui/core";
import { BoardTitle, Actions, BoardCard } from "./styled";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import DoneIcon from "@material-ui/icons/Done";
import { deleteBoard, editBoardName } from "../../axiosRequests/board";
import { get } from "browser-cookies";
import { Close } from "@material-ui/icons";
export const Board = ({ board, getBoards }) => {
  const [edit, setEdit] = useState(false);
  const [newBoardName, setNewBoardName] = useState("");

  return (
    <BoardCard>
      {!edit ? (
        <>
          <BoardTitle to={`/board/${board._id}`}>{board.name}</BoardTitle>
          <Actions>
            <IconButton
              onClick={() => {
                setEdit(true);
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              onClick={() => {
                deleteBoard(board._id).then(() => {
                  getBoards();
                });
              }}
            >
              <DeleteIcon />
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
            <Close />
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
            <DoneIcon />
          </IconButton>
        </>
      )}
    </BoardCard>
  );
};
