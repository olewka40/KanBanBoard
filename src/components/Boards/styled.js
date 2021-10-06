import styled from "styled-components";
import { Link } from "react-router-dom";

const BoardsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const BoardTitle = styled(Link)`
  font-size: 18px;
  font-weight: bolder;
  color: black;
  margin: 20px;
  text-decoration: none;
`;
const BoardCard = styled.div`
  min-width: 250px;
  font-size: 18px;
  font-weight: bolder;
  margin: 20px;
  border-radius: 8px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
const Actions = styled.div`
  display: flex;

  align-items: center;
  justify-content: center;
`;

export { Actions, BoardsContainer, BoardTitle, BoardCard };
