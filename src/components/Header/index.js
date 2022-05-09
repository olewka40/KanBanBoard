import React, { useContext } from "react";
import {
  Actions,
  HeaderComponent,
  HeaderTitle,
  HeaderButton,
  SLink
} from "./styled";
import { createNewBoard } from "../../axiosRequests/board";
import { useHistory } from "react-router-dom";
import { UserContext } from "../context/UserContext";
export const Header = () => {
  const history = useHistory();
  const { user, setUser } = useContext(UserContext);
  const newBoard = async () => {
    const { boardId } = await createNewBoard(
      "Новая доска для работы",
      user._id
    );
    history.push(`/board/${boardId}`);
  };
  const logOut = async () => {
    setUser(null);
    localStorage.removeItem("userSessionBoard");
    history.push(`/`);
  };
  return (
    <HeaderComponent>
      <HeaderTitle>
        <SLink to="/">Канбан-доска</SLink>
      </HeaderTitle>
      <Actions>
        {user && (
          <>
            <HeaderButton onClick={newBoard}>Новая доска</HeaderButton>
            <div style={{ display: "flex" }}>
              <SLink to="/boards">Все доски</SLink>
              <HeaderButton onClick={logOut}>Выйти</HeaderButton>
            </div>
          </>
        )}
      </Actions>
    </HeaderComponent>
  );
};
