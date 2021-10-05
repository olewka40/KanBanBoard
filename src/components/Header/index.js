import React from "react";
import {
  Actions,
  HeaderComponent,
  HeaderTitle,
  CreateBoardButton,
  SLink
} from "./styled";
import { v4 as uuid } from "uuid";
import { createNewBoard } from "../../axiosRequests/board";
export const Header = () => {
  const newBoard = () => {
    createNewBoard();
  };
  return (
    <HeaderComponent>
      <HeaderTitle>Канбан-доска</HeaderTitle>
      <Actions>
        <CreateBoardButton onClick={newBoard}>Новая доска</CreateBoardButton>
        <div style={{ display: "flex" }}>
          <SLink to="/1">1</SLink>
          <SLink to="/2">2</SLink>
        </div>
      </Actions>
    </HeaderComponent>
  );
};
