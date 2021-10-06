import styled, { createGlobalStyle } from "styled-components";
import { Header } from "./components/Header";
import React from "react";
import { Content } from "./components/Content";
import { createTheme, ThemeProvider } from "@material-ui/core/styles/";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import {Boards} from "./components/Boards";

axios.defaults.baseURL = "http://localhost:3002/";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Roboto', sans-serif;
    height: 100vh;
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
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <AppContainer>
          <link
            href="https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i&display=swap&subset=cyrillic"
            rel="stylesheet"
          />
          <GlobalStyle />
          <Header />

          <Switch>
            <Route exact path="/">
              <Main>Добро пожаловать!</Main>
            </Route>
            <Route path="/board/:id">
              <Main>
                <Content />
              </Main>
            </Route>
            <Route path="/boards">
              <Boards />
            </Route>
          </Switch>
        </AppContainer>
      </ThemeProvider>
    </Router>
  );
};

export default App;

const AppContainer = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
`;
const Main = styled.div`
  display: flex;
  height: calc(100% - 60px);
  padding-left: 0;
  padding-top: 20px;
`;
