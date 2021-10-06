import styled from "styled-components";
import { Link } from "react-router-dom";
const HeaderComponent = styled.div`
  height: 60px;
  width: 100%;
  background-color: #2973ec;
  color: aliceblue;
  display: flex;
  align-items: center;

  border-radius: 0 0 10px 10px;
`;
const HeaderTitle = styled.div`
  margin: 10px 40px;
  cursor: pointer;
  font-size: 24px;
  font-weight: bold;
  color: aliceblue;
`;
const Actions = styled.div`
  width: 80%;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const SLink = styled(Link)`
  margin-right: 5px;
  margin-left: 5px;
  color: aliceblue;
  cursor: pointer;
  text-decoration: none;
`;
const HeaderButton = styled.div`
  margin-right: 5px;
  margin-left: 5px;
  color: aliceblue;
  cursor: pointer;
  text-decoration: none;
`;

export { HeaderComponent, HeaderTitle, SLink,HeaderButton, Actions };
