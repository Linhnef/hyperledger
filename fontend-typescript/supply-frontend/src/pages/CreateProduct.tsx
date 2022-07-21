import { Box, Tooltip } from "@mui/material";
import styled from "styled-components";
import { BackIcon, InformationIcon, LoginIcon } from "../assets/icon";
import { CommonLayout } from "../layouts/CommonLayout";
import { spacing } from "../theme";
import BadgeIcon from "@mui/icons-material/Badge";
import { TextFieldOrange } from "../components/textfield/TextFieldOrange";
import { ButtonPrimary } from "../components/buttons/ButtonPrimary";
import { IconButtonPurple } from "../components/buttons/IconButtonPurple";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import { ChangeEvent, useContext, useState } from "react";
import { useAction } from "../libraries/use-action";
import { useApi } from "../hooks/useApi";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { useLink } from "../hooks/useLink";
import { BaseCircleProgress } from "../components/loadings/BaseCircleProgress";
import { ramdomId } from "../helpers/ramdomId";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import { AuthenticationContext } from "../contexts/globalContext";

export const CreateProduct = () => {
  const api = useApi();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const links = useLink();
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>();
  const { user } = useContext(AuthenticationContext);
  const generateId = () => {
    setId("product_" + ramdomId());
  };

  const onIdChange = (event: ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value);
  };
  const onNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const onPriceChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPrice(event.target.valueAsNumber);
  };

  const createProduct = useAction(async () => {
    if (user) {
      const time = new Date().getTime().toString();
      const rs = await api.createProuct({
        ProductId: id,
        FactoryId: user.Record.UserId,
        Status: "NEW",
        Factory: time,
        Price: price ? price : 0,
        Name: name,
      });
      if (rs) {
        enqueueSnackbar("Create product success !", { variant: "success" });
        setId("");
        setName("");
        setPrice(undefined);
        return rs;
      }
      enqueueSnackbar("Something wrong. Please fill all information !", {
        variant: "error",
      });
    }
  });

  const backToHome = () => {
    navigate(links.home());
  };

  const onCreate = () => {
    createProduct.run();
  };

  return (
    <CommonLayout title="Create Product">
      <Wrapper>
        <BackButton onClick={backToHome}>
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
          <TextFieldOrange
            fullWidth
            value={id}
            onChange={onIdChange}
            placeholder="Product ID"
            required={true}
            starticon={<BadgeIcon />}
            endicon={
              <IconButtonPurple onClick={generateId}>
                <ShuffleIcon />
              </IconButtonPurple>
            }
          />
          <TextFieldOrange
            fullWidth
            value={name}
            onChange={onNameChange}
            placeholder="Product Name"
            required={true}
            starticon={<DriveFileRenameOutlineIcon />}
          />
          <TextFieldOrange
            fullWidth
            value={price}
            type="number"
            onChange={onPriceChange}
            placeholder="Price"
            starticon={<MonetizationOnIcon />}
          />
          <ButtonPrimary onClick={onCreate} fullWidth>
            {createProduct.running ? (
              <BaseCircleProgress size={24.5} />
            ) : (
              "Create"
            )}
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
