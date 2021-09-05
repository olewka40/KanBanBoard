import React from "react";
import { Board, TaskSection, Title } from "./styled";
import { Task } from "./Task";

export const TasksBoard = ({ tasksColumns, getBoard }) => {
  return (
    <Board>
      {tasksColumns &&
        tasksColumns.map(column => (
          <TaskSection>
            <Title background={column.background} color={column.color}>
              {column.name}
            </Title>
            {column.tasks.map(t => (
              <Task
                background={column.background}
                task={t}
                getBoard={getBoard}
              />
            ))}
          </TaskSection>
        ))}
    </Board>
  );
};
