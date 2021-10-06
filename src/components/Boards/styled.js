import styled from "styled-components";
import { Link } from "react-router-dom";

const BoardsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const BoardTitle = styled(Link)`
  display: flex;
  align-items: center;
  font-size: 18px;
  font-weight: bolder;
  color: black;
  text-decoration: none;
`;
const BoardTitleNoLink = styled.div`
  display: flex;
  align-items: center;
  font-size: 18px;
  padding: 0 20px;
  font-weight: bolder;
  color: black;
  text-decoration: none;
`;
const BoardCard = styled.div`
  min-width: 250px;
  font-size: 18px;
  font-weight: bolder;
  margin: 20px 20px 20px 0px;
  border-radius: 8px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  padding: 10px 20px;
`;
const Actions = styled.div`
  display: flex;

  align-items: center;
  justify-content: center;
`;

export { Actions, BoardsContainer, BoardTitle, BoardTitleNoLink, BoardCard };
