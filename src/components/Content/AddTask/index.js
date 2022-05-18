import React, { useEffect, useState } from "react";
import { Button, Card, CardContent, TextField } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { AddTaskComponent, SCardContent, Title } from "./styled";
import { createNewTask } from "../../../axiosRequests/task";

export const AddTask = ({ id, getBoard,boardPrivate }) => {
  const [taskName, setTaskName] = useState("");
  const createTask = () => {
    if (taskName === "") return;
    createNewTask(id, taskName).then(({ data }) => {
      setTaskName("");
      getBoard();
      setTaskName("");
      alert(data.message);
    });
  };
  return (
    <AddTaskComponent>
      <Title>Добавить новую задачу</Title>
      <SCardContent>
        <TextField
          value={taskName}
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
