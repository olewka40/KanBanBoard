import React, { useCallback, useState } from "react";
import {
  Avatar,
  TextField,
  FormControlLabel,
  Checkbox
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import axios from "axios";
import { useHistory } from "react-router-dom";
import {
  StyledButton,
  StyledLink,
  Title,
  Container
} from "../Registration/styled";
import { LoginForm, Links, FormFooter } from "./styled";

export const Login = (callback, deps) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const tryAuth = useCallback(async () => {
    const { data } = await axios.get(`api/authorization/${login}/${password}`);
    if (data && data.status === 200) {
      history.replace("/");
    }
  });

  return (
    <Container>
      <LoginForm>
        <Avatar>
          <LockOutlinedIcon color="primary" />
        </Avatar>
        <Title>Добро пожаловать!</Title>
        <form noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={login}
            onChange={({ target: { value: value } }) => {
              setLogin(value);
            }}
            name="Lohin"
            label="Логин"
            type="login"
            id="login"
            autoComplete="login"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={password}
            onChange={({ target: { value: value } }) => {
              setPassword(value);
            }}
            name="password"
            label="Пароль"
            type="password"
            id="password"
            autoComplete="password"
          />
          {/*<FormControlLabel*/}
          {/*  control={*/}
          {/*    <Checkbox*/}
          {/*      value="remember"*/}
          {/*      checked={rememberMe}*/}
          {/*      onClick={() => setRemember(!rememberMe)}*/}
          {/*      color="primary"*/}
          {/*    />*/}
          {/*  }*/}
          {/*  label="Запомнить меня"*/}
          {/*/>*/}
          <FormFooter>
            <StyledButton
              onClick={tryAuth}
              fullWidth
              variant="contained"
              color="primary"
            >
              Войти
            </StyledButton>
            <Links>
              <StyledLink href="/forgot" variant="body2">
                Забыли пароль?
              </StyledLink>
              <StyledLink href="registration" variant="body2">
                Нет аккаунта? Зарегистрируйтесь
              </StyledLink>
            </Links>
          </FormFooter>
        </form>
      </LoginForm>
    </Container>
  );
};
export default Login;
