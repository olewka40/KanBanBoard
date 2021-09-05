import React from "react";
import { Actions, HeaderComponent, HeaderTitle, Link } from "./styled";
import { useRouter } from "next/router";
import { v4 as uuid } from "uuid";
export const Header = () => {
  const router = useRouter();

  const createNewBoard = e => {
    e.preventDefault();
    router.push(`/board/${uuid()}`);
  };

  const toLogin = e => {
    e.preventDefault();
    router.push("/login");
  };

  const toRegistration = e => {
    e.preventDefault();
    router.push("/registration");
  };

  return (
    <HeaderComponent>
      <HeaderTitle>Канбан-доска</HeaderTitle>
      <Actions>
        <Link onClick={createNewBoard}>Новая доска</Link>
        <div style={{ display: "flex" }}>
          <Link onClick={toLogin}>Войти</Link>
          <Link onClick={toRegistration}>Зарегистрироваться</Link>
        </div>
      </Actions>
    </HeaderComponent>
  );
};
