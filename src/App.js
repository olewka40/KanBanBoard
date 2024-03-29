import styled, { createGlobalStyle } from "styled-components";
import { Header } from "./components/Header";
import React, { useEffect, useState } from "react";
import { Content } from "./components/Content";
import { createTheme, ThemeProvider } from "@material-ui/core/styles/";
import { Switch, Route, useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import { Boards } from "./components/Boards";
import { Button } from "@material-ui/core";
import { HeaderTitle } from "./components/Header/styled";
import { Auth } from "./components/Auth";
import { UserContext } from "./components/context/UserContext";

axios.defaults.baseURL = "http://localhost:3002/";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Roboto', sans-serif;
    // TODO: тестирование высота=> мин высота
    min-height: 100vh;
    width: 100%;
    background-color: #ecf3fc;
    
  }
  #root {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
  }
`;

const theme = createTheme({
  palette: {
    primary: {
      main: "#2973ec"
    }
  }
});

const App = () => {
  const history = useHistory();
  const location = useLocation();
  const [user, setUser] = useState(undefined);

  const toBoards = () => {
    history.push(`/boards`);
  };

  const checkAuth = async () => {
    const user = JSON.parse(localStorage.getItem("userSessionBoard"));
    if (user !== null) {
      setUser(user);
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    checkAuth();
  }, [location.pathname]);

  return (
    <ThemeProvider theme={theme}>
      <UserContext.Provider
        value={{
          user,
          setUser
        }}
      >
        <AppContainer>
          <link
            href="https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i&display=swap&subset=cyrillic"
            rel="stylesheet"
          />
          <GlobalStyle />
          <Header />

          <Switch>
            <Route exact path="/">
              <Welcome>
                {Boolean(user) ? (
                  <>
                    <HeaderTitle style={{ color: "#2973ec" }}>
                      Выберите доску для работы
                    </HeaderTitle>
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={toBoards}
                    >
                      Перейти к доскам
                    </Button>
                  </>
                ) : (
                  <Auth setUser={setUser} />
                )}
              </Welcome>
            </Route>
            <Route path="/board/:id">
              <Main>
                <Content />
              </Main>
            </Route>
            <Route path="/boards">
              <Boards user={user} />
            </Route>
          </Switch>
        </AppContainer>
      </UserContext.Provider>
    </ThemeProvider>
  );
};

export default App;

const AppContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
`;
const Main = styled.div`
  display: flex;
  min-height: calc(100vh - 60px);
  padding-left: 0;
  padding-top: 20px;
`;
const Welcome = styled.div`
  display: flex;
  height: calc(100vh - 60px);
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
