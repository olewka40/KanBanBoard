import React, { useContext, useEffect, useState } from "react";
import { Button, Card, CardContent, TextField } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { AddTaskComponent, SCardContent, Title } from "./styled";
import { createNewTask } from "../../../axiosRequests/task";
import { UserContext } from "../../context/UserContext";

export const AddTask = ({ id, getBoard }) => {
  const [taskName, setTaskName] = useState("");
  const { showAlert } = useContext(UserContext);
  const createTask = () => {
    if (
      taskName === "" ||
      taskName === " " ||
      taskName === " " ||
      taskName[0] === " "
    ) {
      setTaskName("");
      showAlert({
        message: "Введите название новой задачи!",
        severity: "warning"
      });

      return;
    }
    createNewTask(id, taskName).then(({ data }) => {
      setTaskName("");
      getBoard();
      setTaskName("");
      showAlert({ message: data.message, severity: "success" });
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
          onKeyPress={event => {
            if (event.key === "Enter") {
              createTask();
            }
          }}
        />
        <Button
          onClick={createTask}
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onEnter={createTask}
        >
          Добавить
        </Button>
      </SCardContent>
    </AddTaskComponent>
  );
};
