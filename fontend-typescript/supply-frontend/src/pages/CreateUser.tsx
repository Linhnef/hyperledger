import { Box, MenuItem, SelectChangeEvent, Tooltip } from "@mui/material";
import styled from "styled-components";
import { BackIcon, InformationIcon, LoginIcon } from "../assets/icon";
import { CommonLayout } from "../layouts/CommonLayout";
import { spacing } from "../theme";
import BadgeIcon from "@mui/icons-material/Badge";
import PasswordIcon from "@mui/icons-material/Password";
import { TextFieldOrange } from "../components/textfield/TextFieldOrange";
import { ButtonPrimary } from "../components/buttons/ButtonPrimary";
import { IconButtonPurple } from "../components/buttons/IconButtonPurple";
import AttachEmailIcon from "@mui/icons-material/AttachEmail";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import BusinessIcon from "@mui/icons-material/Business";
import { SelectPrimary } from "../components/selects/SelectPrimary";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { ChangeEvent, useState } from "react";
import { useAction } from "../libraries/use-action";
import { useApi } from "../hooks/useApi";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { useLink } from "../hooks/useLink";
import { BaseCircleProgress } from "../components/loadings/BaseCircleProgress";

export const CreateUser = () => {
  const api = useApi();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const links = useLink();
  const [role, setRole] = useState("");
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [show, setShow] = useState(false);

  const onShowPassword = () => {
    setShow(!show);
  };
  const onIdChange = (event: ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value);
  };
  const onNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const onEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const onPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const onAddressChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
  };
  const onRoleChange = (event: SelectChangeEvent<string | number>) => {
    setRole(event.target.value as string);
  };

  const signUp = useAction(async () => {
    const rs = await api.signUp({
      userId: id,
      password: password,
      userEmail: email,
      userRole: role,
      userName: name,
      address: address,
    });
    if (rs) {
      enqueueSnackbar("Register success !", { variant: "success" });
      navigate(links.login());
      return;
    }
    enqueueSnackbar("Something wrong. Please fill all information !", {
      variant: "error",
    });
  });

  const backToLogin = () => {
    navigate(links.login());
  };

  const onSignUp = () => {
    signUp.run();
  };

  return (
    <CommonLayout title="Sign Up">
      <Wrapper>
        <BackButton onClick={backToLogin}>
          <BackIcon />
        </BackButton>
        <Tooltip title="Description" describeChild>
          <InformationButton>
            <InformationIcon />
          </InformationButton>
        </Tooltip>
        <IconContainer>
          <Icon />
        </IconContainer>
        <FormContainer>
          <SelectPrimary handleChange={onRoleChange} label="Role" value={role}>
            <MenuItem value={"CONSUMER"}>Consumer</MenuItem>
            <MenuItem value={"FACTORY"}>Factory</MenuItem>
            <MenuItem value={"RETAILER"}>Retailer</MenuItem>
            <MenuItem value={"DISTRIBUTOR"}>Distributor</MenuItem>
            <MenuItem value={"WHOLE_SALER"}>Whole saler</MenuItem>
          </SelectPrimary>
          <TextFieldOrange
            fullWidth
            value={id}
            onChange={onIdChange}
            placeholder="User ID"
            required={true}
            starticon={<BadgeIcon />}
          />
          <TextFieldOrange
            fullWidth
            value={name}
            onChange={onNameChange}
            placeholder="User Name"
            required={true}
            starticon={<PersonPinIcon />}
          />
          <TextFieldOrange
            fullWidth
            value={email}
            onChange={onEmailChange}
            type="email"
            placeholder="Email"
            starticon={<AttachEmailIcon />}
          />
          <TextFieldOrange
            fullWidth
            value={password}
            onChange={onPasswordChange}
            required={true}
            placeholder="Password"
            type={show ? "text" : "password"}
            starticon={<PasswordIcon />}
            endicon={
              <IconButtonPurple onClick={onShowPassword}>
                {show ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButtonPurple>
            }
          />
          <TextFieldOrange
            placeholder="Address"
            fullWidth
            required={true}
            value={address}
            onChange={onAddressChange}
            starticon={<BusinessIcon />}
          />
          <ButtonPrimary onClick={onSignUp} fullWidth>
            {signUp.running ? <BaseCircleProgress size={24.5} /> : "Register"}
          </ButtonPrimary>
        </FormContainer>
      </Wrapper>
    </CommonLayout>
  );
};

const InformationButton = styled(IconButtonPurple)`
  position: absolute !important;
  right: 0;
  top: 0;
`;

const BackButton = styled(IconButtonPurple)`
  position: absolute !important;
  left: 0;
  top: 0;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const FormContainer = styled.form`
  text-align: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const Icon = styled(LoginIcon)`
  margin: ${spacing.m} 0;
`;

const Wrapper = styled(Box)`
  width: 50vw;
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 0 ${spacing.l};
  position: relative;
`;
