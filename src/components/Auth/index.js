import axios from "axios";
import styled from "styled-components";
import { HeaderTitle } from "../Header/styled";
import {
  TextField,
  Button,
  Tabs,
  Tab,
  Box,
  Typography
} from "@material-ui/core";
import { useState } from "react";
import PropTypes from "prop-types";

const isClean = value => {
  return value === "" || value === " ";
};

export const Auth = ({ setUser }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setLogin("");
    setPassword("");
  };

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const authorization = async () => {
    if (isClean(password) && isClean(login)) {
      alert("Поля не могут быть пустыми");
      return;
    }
    await axios
      .get(`/api/authorization/${login}/${password}`)
      .then(({ data }) => {
        if (data.success) {
          setUser(data.user);
          localStorage.setItem("userSessionBoard", JSON.stringify(data.user));
        }
        alert(data.message);
      });
  };
  const createNewUser = async () => {
    if (isClean(password) && isClean(login)) {
      alert("Поля не могут быть пустыми");
      return;
    }
    await axios
      .post(`/api/createNewUser/`, {
        login,
        password
      })
      .then(({ data }) => {
        alert(data.message);
      });
  };
  return (
    <>
      <AuthBlock>
        <Tabs value={value} onChange={handleChange} indicatorColor="primary">
          <Tab label="Авторизация" indicatorColor="primary" />
          <Tab label="Регистрация" indicatorColor="primary" />
        </Tabs>
        <TabPanel value={value} index={0}>
          <Block>
            <HeaderTitle style={{ color: "#2973ec" }}>
              Авторизируйтесь чтобы продолжить работу
            </HeaderTitle>

            <TextField
              style={{ margin: 10 }}
              variant="outlined"
              placeholder="Логин"
              value={login}
              onChange={e => {
                setLogin(e.target.value);
              }}
            />
            <TextField
              style={{ margin: 10 }}
              variant="outlined"
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={e => {
                setPassword(e.target.value);
              }}
            />
            <Button color="primary" variant="contained" onClick={authorization}>
              Авторизоваться
            </Button>
          </Block>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Block>
            <HeaderTitle style={{ color: "#2973ec" }}>
              Зарегистрируйтесь чтобы продолжить работу
            </HeaderTitle>

            <TextField
              style={{ margin: 10 }}
              variant="outlined"
              placeholder="Логин"
              value={login}
              onChange={e => {
                setLogin(e.target.value);
              }}
            />
            <TextField
              style={{ margin: 10 }}
              variant="outlined"
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={e => {
                setPassword(e.target.value);
              }}
            />
            <Button color="primary" variant="contained" onClick={createNewUser}>
              Зарегистрироваться
            </Button>
          </Block>
        </TabPanel>
      </AuthBlock>
    </>
  );
};
const AuthBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const Block = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};
