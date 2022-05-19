import React, { useContext, useState } from "react";
import { Button, Card, CardContent, TextField } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { createNewBoard } from "../../axiosRequests/board";
import {
  AddTaskComponent,
  SCardContent,
  Title
} from "../Content/AddTask/styled";
import { UserContext } from "../context/UserContext";

export const AddBoard = ({ getBoards }) => {
  const [boardName, setBoardName] = useState("");
  const { user, showAlert } = useContext(UserContext);

  const createBoard = () => {
    if (boardName === "" || boardName === " " || boardName === " ") {
      showAlert({
        message: "Введите название новой доски!",
        severity: "error"
      });

      return;
    }
    createNewBoard(boardName, user._id).then(({ status, message }) => {
      getBoards();
      setBoardName("");
      if (status) showAlert({ message: message, severity: "success" });
    });
  };
  return (
    <AddTaskComponent>
      <Title>Добавить новую Доску</Title>
      <SCardContent>
        <TextField
          value={boardName}
          variant="outlined"
          placeholder="Название доски"
          onChange={e => {
            setBoardName(e.target.value);
          }}
          onKeyPress={event => {
            if (event.key === "Enter") {
              createBoard();
            }
          }}
        />
        <Button
          onClick={createBoard}
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
        >
          Добавить
        </Button>
      </SCardContent>
    </AddTaskComponent>
  );
};
