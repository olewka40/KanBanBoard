import React from "react";
import { AddTask } from "./AddTask";
import { TasksBoard } from "./TasksBoard";
import { Container } from "./styled";

export const Content = () => {
  return (
    <Container>
      <AddTask />
      <TasksBoard />
    </Container>
  );
};
