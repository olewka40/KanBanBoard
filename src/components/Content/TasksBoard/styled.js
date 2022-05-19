import styled from "styled-components";

const Board = styled.div`
  margin-top: 40px;

  display: flex;
  justify-content: space-between;
`;
const Title = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 10px;
  width: 175px;
  background-color: ${props => props.background};
  color: ${props => props.color};
  font-weight: bold;
  font-size: 16px;
  border-radius: 8px;
`;

const TaskSection = styled.div``;

export { Board, TaskSection, Title };
