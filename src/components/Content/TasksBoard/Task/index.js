import React from "react";
import { TaskContainer } from "./styled";

export const Task = ({ background, task }) => {
  return <TaskContainer background={background}>{task}</TaskContainer>;
};
