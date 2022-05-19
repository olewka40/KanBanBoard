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
import { useContext, useState } from "react";
import PropTypes from "prop-types";
import { UserContext } from "../context/UserContext";

const isClean = value => {
  return value === "" || value === " ";
};

export const Auth = ({ setUser }) => {
  const [value, setValue] = useState(0);
  const { showAlert } = useContext(UserContext);
  const handleChange = (event, newValue) => {
    setValue(newValue);
    setLogin("");
    setPassword("");
  };
  const validPassword = password => {
    // Минимум восемь символов, минимум одна буква и одна цифра:
    const regularValue = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const result = regularValue.test(password);
    console.log(result);
    if (!result) {
      showAlert({
        message:
          "Пароль должен состоять из 8 символов,содержать цифру и  букву",
        severity: "success"
      });
    }
    return result;
  };
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const authorization = async () => {
    if (isClean(password) || isClean(login)) {
      showAlert({ message: "Поля не могут быть пустыми", severity: "error" });

      return;
    }
    await axios
      .get(`/api/authorization/${login}/${password}`)
      .then(({ data }) => {
        if (data.success) {
          setUser(data.user);
          localStorage.setItem("userSessionBoard", JSON.stringify(data.user));
        }
        console.log(data);
        showAlert({ message: data.message, severity: "success" });
      });
  };
  const createNewUser = async () => {
    if (isClean(login)) {
      showAlert({ message: "Поля не могут быть пустыми", severity: "warning" });
      return;
    } else if (!validPassword(password)) {
      return;
    } else {
      await axios
        .post(`/api/createNewUser/`, {
          login,
          password
        })
        .then(({ data }) => {
          showAlert({ message: data.message, severity: "warning" });;
        });
    }
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
