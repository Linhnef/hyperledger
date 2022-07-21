/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, CircularProgress, Tooltip } from "@mui/material";
import styled from "styled-components";
import { InformationIcon, LoginIcon } from "../assets/icon";
import { Heading4 } from "../components/typography/Heading4";
import { CommonLayout } from "../layouts/CommonLayout";
import { spacing } from "../theme";
import BadgeIcon from "@mui/icons-material/Badge";
import PasswordIcon from "@mui/icons-material/Password";
import { TextFieldOrange } from "../components/textfield/TextFieldOrange";
import { Heading5 } from "../components/typography/Heading5";
import { ButtonPrimary } from "../components/buttons/ButtonPrimary";
import { ButtonLink } from "../components/buttons/ButtonLink";
import { DividerBase } from "../components/DividerBase";
import { IconButtonPurple } from "../components/buttons/IconButtonPurple";
import { useApi } from "../hooks/useApi";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { useLink } from "../hooks/useLink";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useAsync } from "../libraries/use-async";
import { useAction } from "../libraries/use-action";
import { BaseCircleProgress } from "../components/loadings/BaseCircleProgress";
import { AuthenticationContext } from "../contexts/globalContext";

export const Login = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassWord] = useState("");
  const [show, setShow] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  let navigate = useNavigate();
  const link = useLink();
  const { setUser, setToken } = useContext(AuthenticationContext);

  const api = useApi();

  const loginAction = useAction(async () => {
    const rs = await api.login({ userId, password });
    if (rs) {
      if (rs.user.Status !== "ACTIVE") {
        enqueueSnackbar("This Account Was Deleted By Admin !", {
          variant: "info",
        });
        return;
      }
      localStorage.setItem("token", rs.token);
      localStorage.setItem("user", JSON.stringify({ Record: rs.user }));
      console.log(rs.user);
      setUser({ Record: rs.user });
      setToken(rs.token);
      if (rs.user.UserRole === "admin") {
        enqueueSnackbar("Login success !", { variant: "success" });
        navigate(link.admin());
        return;
      }
      enqueueSnackbar("Login success !", { variant: "success" });
      navigate(link.home());
      return;
    }
    enqueueSnackbar("Something went wrong, please check your information !", {
      variant: "error",
    });
  });

  const onShowPassword = () => {
    setShow(!show);
  };
  const onIdChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUserId(event.target.value);
  };

  const onPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassWord(event.target.value);
  };

  const onLogin = () => {
    loginAction.run();
  };

  return (
    <CommonLayout title="Login">
      <Wrapper>
        <Tooltip title="Description" describeChild>
          <InformationButton>
            <InformationIcon />
          </InformationButton>
        </Tooltip>
        <Icon />
        <Heading4>WELCOME TO SUPPLY CHAIN</Heading4>
        <DividerBase />
        <FormContainer>
          <Heading5>Login with user ID</Heading5>
          <TextFieldOrange
            value={userId}
            placeholder="User Id"
            onChange={onIdChange}
            fullWidth
            starticon={<BadgeIcon />}
          />
          <TextFieldOrange
            type={show ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={onPasswordChange}
            fullWidth
            starticon={<PasswordIcon />}
            endicon={
              <IconButtonPurple onClick={onShowPassword}>
                {show ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButtonPurple>
            }
          />
          <ButtonPrimary onClick={onLogin} fullWidth>
            {loginAction.running ? <BaseCircleProgress size={24.5} /> : "Login"}
          </ButtonPrimary>
        </FormContainer>
        <ButtonLink link={link.signUp()}>
          You don't have account? Sign up.
        </ButtonLink>
      </Wrapper>
    </CommonLayout>
  );
};

const InformationButton = styled(IconButtonPurple)`
  position: absolute !important;
  right: 0;
  top: 0;
`;

const FormContainer = styled.form`
  text-align: center;
  margin: ${spacing.lx} 0;
`;

const Icon = styled(LoginIcon)`
  margin: ${spacing.lx} 0;
`;

const Wrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: ${spacing.lx} ${spacing.l};
  position: relative;
`;
