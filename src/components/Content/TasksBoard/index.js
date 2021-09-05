import React from "react";
import { Board, TaskSection, Title } from "./styled";
import { Task } from "./Task";

export const TasksBoard = () => {
  const array = [
    { name: "Сделать домашку" },
    { name: "Сделать кашку" },
    { name: "Выучить JS" },
    { name: "Приготовить покушать" },
    { name: "Позвонить Маме" }
  ];
  const columns = [
    { name: "Надо сделать", background: "#e0dfe1", color: "#706f70" },
    { name: "В процессе", background: "#d1e3fb", color: "#4472c7" },
    { name: "Готово", background: "#d2f7db", color: "#69ab76" },
    { name: "Корзина", background: "#fbdedf", color: "#b56b73" }
  ];
  return (
    <Board>
      {columns.map(column => (
        <TaskSection>
          <Title background={column.background} color={column.color}>
            {column.name}
          </Title>
          {array.map(t => (
            <Task background={column.background} task={t.name} />
          ))}
        </TaskSection>
      ))}
    </Board>
  );
};
