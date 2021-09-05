import styled from "styled-components";
import { Header } from "../components/Header";
import React from "react";
import { Content } from "../components/Content";

const App = () => {
  return (
    <AppContainer>
      <Header />
      <Main>
        <Content />
      </Main>
    </AppContainer>
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
  padding-top: 40px;
}
`;
