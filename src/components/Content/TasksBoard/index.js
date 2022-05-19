import React from "react";
import { Board, TaskSection, Title } from "./styled";
import { Task } from "./Task";

export const TasksBoard = ({
  tasksColumns,
  getBoard,
  boardId,
  userOwner,
  canEditAccess
}) => {
  return (
    <Board>
      {tasksColumns &&
        tasksColumns.map(column => (
          <TaskSection key={column.name}>
            <Title background={column.background} color={column.color}>
              {column.name} {column.tasksCount}
            </Title>
            {column.tasks.map(t => (
              <Task
                userOwner={userOwner}
                canEditAccess={canEditAccess}
                boardId={boardId}
                key={t._id}
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
