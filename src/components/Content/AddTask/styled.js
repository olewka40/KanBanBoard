import styled from "styled-components";
import { Card, CardContent } from "@material-ui/core";

const AddTaskComponent = styled(Card)`
  width: 400px;
  height: 150px;
  border-radius: 20px;
`;

const Title = styled.p`
  font-size: 20px;
  font-weight: bolder;
  padding: 0 20px;
`;
const SCardContent = styled(CardContent)`
  display: flex;
  justify-content: space-between;
`;

export { AddTaskComponent, Title, SCardContent };
