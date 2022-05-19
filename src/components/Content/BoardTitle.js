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
import { ShareBoard } from "./ShareBoard";
import { UserContext } from "../context/UserContext";
export const BoardTitleComponent = ({ board, getBoard, canEditAccess }) => {
  const [editBoardMode, setEditBoardMode] = useState(false);
  const [newBoardName, setNewBoardName] = useState("");
  const history = useHistory();
  const { showAlert, user } = useContext(UserContext);
  const isMyBoard = board.ownerId === user._id;

  const canEditBoard = () => {
    // если моя доска то можно
    if (isMyBoard) return true;

    return canEditAccess(); // проверяю в массиве если есть то отрицаю и можно
  };

  useEffect(() => {
    if (board.private) {
      !canEditBoard() && history.push("/");
    } else {
    }
  }, [user, board]);

  return (
    <BoardTitleNoLink>
      {!editBoardMode ? (
        <div style={{ display: "flex", alignItems: "center" }}>
          <BoardName>{board.name}</BoardName>
          <div>
            {canEditBoard() && (
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
          {canEditBoard() && (
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
                    setNewBoardName("");
                    setEditBoardMode(false);
                    getBoard();
                    showAlert({ message: data.message, severity: "success" });
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
        {isMyBoard && (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center"
            }}
          >
            <IconButton
              onClick={() => {
                inversionPrivate(board).then(data => {
                  console.log(data);
                  showAlert({ message: data.message, severity: "success" });
                  getBoard();
                });
              }}
            >
              {board.private ? (
                <Lock color="primary" />
              ) : (
                <LockOpen color="primary" />
              )}
            </IconButton>
            <ShareBoard
              boardId={board._id}
              usersCanEdit={board.canEdit}
              getBoard={getBoard}
            />
            <Button
              style={{ marginRight: 10, marginLeft: 10 }}
              onClick={() => {
                const confirmed = confirm(
                  "Вы действительно хотите удалить доску?"
                );
                if (confirmed) {
                  deleteBoard(board._id).then(({ data }) => {
                    showAlert({ message: data.message, severity: "success" });
                    history.replace("/boards");
                  });
                }
              }}
              color="secondary"
              variant="contained"
            >
              Удалить доску
            </Button>
          </div>
        )}
      </div>
    </BoardTitleNoLink>
  );
};
