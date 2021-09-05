import React from "react";
import { Button, Card, CardContent, TextField } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { AddTaskComponent, SCardContent, Title } from "./styled";

export const AddTask = () => {
  return (
    <AddTaskComponent>
      <Title>Новая задача</Title>
      <SCardContent>
        <TextField variant="outlined" placeholder="Название задачи" />
        <Button variant="contained" color="primary" startIcon={<AddIcon />}>
          Добавить{" "}
        </Button>
      </SCardContent>
    </AddTaskComponent>
  );
};
