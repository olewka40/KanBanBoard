import { BoardName } from "./styled";
import { IconButton, TextField, Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { Close, Lock, LockOpen } from "@material-ui/icons";

import {
  deleteBoard,
  editBoardName,
  inversionPrivate
} from "../../axiosRequests/board";
import DoneIcon from "@material-ui/icons/Done";
import React, { useContext, useEffect, useState } from "react";
import { BoardTitleNoLink } from "../Boards/styled";
import { useHistory } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import axios from "axios";
export const BoardTitleComponent = ({ board, getBoard, userOwner }) => {
  const [editBoardMode, setEditBoardMode] = useState(false);
  const [newBoardName, setNewBoardName] = useState("");

  const history = useHistory();

  const boardPrivate =
    board.private &&
    board.ownerId !== JSON.parse(localStorage.getItem("userSessionBoard"))._id;

  useEffect(() => {
    boardPrivate && history.push("/");
  });

  return (
    <BoardTitleNoLink>
      {!editBoardMode ? (
        <div style={{ display: "flex", alignItems: "center" }}>
          <BoardName>{board.name}</BoardName>
          <div>
            {userOwner && (
              <IconButton
                onClick={() => {
                  setEditBoardMode(true);
                  setNewBoardName("");
                }}
              >
                <EditIcon color="primary" />
              </IconButton>
            )}
          </div>
        </div>
      ) : (
        <div>
          {userOwner && (
            <>
              <TextField
                variant="outlined"
                defaultValue={board.name}
                placeholder="Введите новое имя"
                onChange={e => {
                  setNewBoardName(e.target.value);
                }}
              />
              <IconButton
                onClick={() => {
                  setEditBoardMode(false);
                  setNewBoardName("");
                }}
              >
                <Close color="error" />
              </IconButton>
              <IconButton
                onClick={() => {
                  if (newBoardName === "") return;
                  editBoardName(board._id, newBoardName).then(({ data }) => {
                    setEditBoardMode(false);
                    getBoard();
                    alert(data.message);
                  });
                }}
              >
                <DoneIcon color="primary" />
              </IconButton>
            </>
          )}
        </div>
      )}
      <div>
        {userOwner && (
          <>
            <IconButton
              onClick={() => {
                inversionPrivate(board).then(data => {
                  console.log(data);
                  alert(data.message);
                  getBoard();
                });
              }}
            >
              {board.private ? (
                <LockOpen color="primary" />
              ) : (
                <Lock color="primary" />
              )}
            </IconButton>
            <Button
              onClick={() => {
                deleteBoard(board._id).then(({ data }) => {
                  alert(data.message);
                  history.replace("/boards");
                });
              }}
              color="secondary"
              variant="contained"
            >
              Удалить доску
            </Button>
          </>
        )}
      </div>
    </BoardTitleNoLink>
  );
};
