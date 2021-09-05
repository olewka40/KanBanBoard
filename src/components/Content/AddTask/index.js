import React, { useState } from "react";
import { Button, Card, CardContent, TextField } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { AddTaskComponent, SCardContent, Title } from "./styled";
import { createNewTask } from "../../../axiosRequests/task";

export const AddTask = ({ id, getBoard }) => {
  const [taskName, setTaskName] = useState();
  const createTask = () => {
    createNewTask(id, taskName).then(e => {
      getBoard();
    });
  };
  return (
    <AddTaskComponent>
      <Title>Новая задача</Title>
      <SCardContent>
        <TextField
          variant="outlined"
          placeholder="Название задачи"
          onChange={e => {
            setTaskName(e.target.value);
          }}
        />
        <Button
          onClick={createTask}
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
