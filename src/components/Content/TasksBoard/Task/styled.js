import styled from "styled-components";

const TaskContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 5px 10px 0px;
  width: 250px;
  height: 60px;
  background-color: white;
  box-shadow: 10px 0 0px -2px ${props => props.background} inset;
  border-radius: 8px;
  font-weight: bolder;
  padding-left: 15px;
  word-break: break-word;
`;
const TaskName = styled.div``;

export { TaskContainer, TaskName };
