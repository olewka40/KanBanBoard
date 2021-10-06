import React, { useState } from "react";
import { Button, Card, CardContent, TextField } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { createNewBoard } from "../../axiosRequests/board";
import {
  AddTaskComponent,
  SCardContent,
  Title
} from "../Content/AddTask/styled";

export const AddBoard = ({ getBoards }) => {
  const [boardName, setBoardName] = useState();
  const createBoard = () => {
    createNewBoard(boardName).then(e => {
      getBoards();
    });
  };
  return (
    <AddTaskComponent>
      <Title>Добавить новую Доску</Title>
      <SCardContent>
        <TextField
          variant="outlined"
          placeholder="Название доски"
          onChange={e => {
            setBoardName(e.target.value);
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
