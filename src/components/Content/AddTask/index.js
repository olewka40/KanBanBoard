import React, {useContext, useEffect, useState} from "react";
import { Button, Card, CardContent, TextField } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { AddTaskComponent, SCardContent, Title } from "./styled";
import { createNewTask } from "../../../axiosRequests/task";
import {UserContext} from "../../context/UserContext";

export const AddTask = ({ id, getBoard }) => {
  const [taskName, setTaskName] = useState("");
  const { showAlert } = useContext(UserContext);
  const createTask = () => {
    if (taskName === "") return;
    createNewTask(id, taskName).then(({ data }) => {
      setTaskName("");
      getBoard();
      setTaskName("");
      showAlert({ massage: data.message, severity: "success" });
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
