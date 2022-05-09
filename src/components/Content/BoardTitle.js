import { BoardName } from "./styled";
import { IconButton, TextField, Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { Close } from "@material-ui/icons";
import { deleteBoard, editBoardName } from "../../axiosRequests/board";
import DoneIcon from "@material-ui/icons/Done";
import React, { useState } from "react";
import { BoardTitleNoLink } from "../Boards/styled";
import { useHistory } from "react-router-dom";
export const BoardTitleComponent = ({ board, getBoard }) => {
  const [editBoardMode, setEditBoardMode] = useState(false);
  const [newBoardName, setNewBoardName] = useState("");

  const history = useHistory();

  return (
    <BoardTitleNoLink>
      {!editBoardMode ? (
        <div style={{ display: "flex", alignItems: "center" }}>
          <BoardName>{board.name}</BoardName>
          <div>
            <IconButton
              onClick={() => {
                setEditBoardMode(true);
                setNewBoardName("");
              }}
            >
              <EditIcon color="primary" />
            </IconButton>
          </div>
        </div>
      ) : (
        <div>
          <TextField
            variant="outlined"
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
        </div>
      )}
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
    </BoardTitleNoLink>
  );
};
