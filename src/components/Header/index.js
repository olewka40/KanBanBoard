import React from "react";
import {
  Actions,
  HeaderComponent,
  HeaderTitle,
  HeaderButton,
  SLink
} from "./styled";
import { v4 as uuid } from "uuid";
import { createNewBoard } from "../../axiosRequests/board";
import { useHistory } from "react-router-dom";
export const Header = () => {
  const history = useHistory();

  const newBoard = async () => {
    const { boardId } = await createNewBoard();
    history.push(`/board/${boardId}`);
    // history.push(`board/${boardId}`);
  };
  return (
    <HeaderComponent>
      <HeaderTitle>
        <SLink to="/">Канбан-доска</SLink>
      </HeaderTitle>
      <Actions>
        <HeaderButton onClick={newBoard}>Новая доска</HeaderButton>
        <div style={{ display: "flex" }}>
          <SLink to="/boards">Все доски</SLink>
        </div>
      </Actions>
    </HeaderComponent>
  );
};
